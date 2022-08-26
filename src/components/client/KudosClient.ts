import * as anchor from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { IDL, KudosProgram } from "./kudos_program";

export class KudosClient {
    wallet        : AnchorWallet;
    provider      : anchor.Provider;
    programId     : anchor.Address;
    program       : anchor.Program<KudosProgram>;
    user          : PublicKey = PublicKey.default;
    SEED_PHRASE   : string = "kudos-stats-v0.3";
    VERSION_NUMBER: anchor.BN = new anchor.BN(3);
    PDA           : PublicKey = PublicKey.default;
    PDA_BUMP      : number = 255;
    otherAccounts : any[] = [];

    constructor(connection: anchor.web3.Connection, 
                wallet: AnchorWallet) {
        this.wallet = wallet;
        this.provider = new anchor.AnchorProvider(
            connection, 
            this.wallet,
            {
                commitment: "max",
                preflightCommitment: "max",
                skipPreflight: false
            }
        );
        this.user = this.wallet.publicKey;
        this.programId = "FrR535wDsm4PUEU41ipJRMWYJj4bMoQX6GPqiKfQdgzU";
        anchor.setProvider(this.provider);
        this.program = new anchor.Program(
            IDL,
            this.programId,
            this.provider
        );
    }

    // Get the account data for the current user.
    async getCurrentUser() {
        // Get the PDA for the current user associated with this program.
        const [PDA, _] = PublicKey.findProgramAddressSync(
            [
                anchor.utils.bytes.utf8.encode(this.SEED_PHRASE),
                this.user.toBuffer()
            ],
            this.program.programId
        );

        // Fetch the UserSstats struct at the PDA.
        return this.program.account.userStats.fetch(PDA);
    }

    // Find all users of this program with accounts.
    async findUsers() {
        // Get list of PDAs associated with the program ID.
        const data = await this.provider.connection.getProgramAccounts(this.program.programId)
        const newaccs = await data.filter((item, idx) => {
            return item.account.data.length === 129;
        })
        // Get the UserStats struct from the account data.
        const userStats = await Promise.all(newaccs.map((item, index) => {return this.program.account.userStats.fetch(item.pubkey)}));

        // Assign the list of accounts to the list returned.
        this.otherAccounts = userStats.filter((elem, idx, arr) => {
            return (elem.version === this.VERSION_NUMBER);
        });

        // Return the list for further processing.
        return userStats;
    }

    // Give kudos to an account
    async giveKudos(pubkey: PublicKey) {
        // Get the PDA for the current user associated with this program.
        const [PDAtx, btx] = PublicKey.findProgramAddressSync(
            [
                anchor.utils.bytes.utf8.encode(this.SEED_PHRASE),
                this.user.toBuffer()
            ],
            this.program.programId
        );

        const [PDArx, brx] = PublicKey.findProgramAddressSync(
            [
                anchor.utils.bytes.utf8.encode(this.SEED_PHRASE),
                pubkey.toBuffer()
            ],
            this.program.programId
        );

        const tx = await this.program.methods
                .giveKudos(new anchor.BN(10))
                .accounts({
                    kudosSender: this.user,
                    kudosReceiver: pubkey,
                    senderStats: PDAtx,
                    receiverStats: PDArx
                })
                .rpc();
        
        return tx;
    }

    // Create an account for the current user. 
    async createAccountForUser(name: string) {
        // Find the program derived address for the 
        // current user deterministically.
        return PublicKey.findProgramAddress(
            [
                anchor.utils.bytes.utf8.encode(this.SEED_PHRASE),
                this.user.toBuffer() 
            ],
            this.program.programId
        )
        .then(([pda, pda_bump]) => {
            this.PDA = pda;
            this.PDA_BUMP = pda_bump;
            return this.program.methods
                .createUserStats(name, pda_bump) // Create the account
                .accounts({
                    user: this.user,
                    userStats: pda,
                    systemProgram: SystemProgram.programId
                })
                .rpc();
        })
    }

    // Update the name associated with the account.
    async updateName(new_name: string) {
        // Find the PDA
        return PublicKey.findProgramAddress(
            [
                anchor.utils.bytes.utf8.encode(this.SEED_PHRASE),
                this.user.toBuffer() 
            ],
            this.program.programId
        )
        .then(([pda, _]) => {
            return this.program.methods
                .updateName(new_name) // Change the name.
                .accounts({
                    user: this.user,
                    userStats: pda,
                })
                .rpc();
        })
    }

    // Close the account associated with an address.
    async closeAccount() {
        return PublicKey.findProgramAddress(
            [
                anchor.utils.bytes.utf8.encode(this.SEED_PHRASE),
                this.user.toBuffer() 
            ],
            this.program.programId
        )
        .then(([pda, pda_bump]) => {
            this.PDA = pda;
            this.PDA_BUMP = pda_bump;
            return this.program.methods
                .closeUserStats(true)
                .accounts({
                    user: this.user,
                    userStats: pda,
                    systemProgram: SystemProgram.programId
                })
                .rpc();
        })
    }
}