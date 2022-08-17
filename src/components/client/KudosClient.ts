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
    SEED_PHRASE   : string = "kudos-stats";
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

    async getCurrentUser() {
        const [PDA, _] = PublicKey.findProgramAddressSync(
            [
                anchor.utils.bytes.utf8.encode(this.SEED_PHRASE),
                this.user.toBuffer()
            ],
            this.program.programId
        );
        return this.program.account.userStats.fetch(PDA);
    }

    async findUsers() {
        const data = await this.provider.connection.getProgramAccounts(this.program.programId)
        const pubkeys = data.map((item) => item.pubkey);
        // this.otherAccounts = pubkeys;
        const userStats = await Promise.all(data.map((item, index) => {return this.program.account.userStats.fetch(item.pubkey)}));

        this.otherAccounts = userStats;
        return userStats;
    }

    async giveKudos(pubkey: PublicKey) {
        return this.program.methods
                .giveKudos(new anchor.BN(10))
                .accounts({
                    kudosSender: this.user,
                    kudosReceiver: pubkey,
                })
                .rpc();
    }

    async createAccountForUser(name: string) {
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
                .createUserStats(name, pda_bump)
                .accounts({
                    user: this.user,
                    userStats: pda,
                    systemProgram: SystemProgram.programId
                })
                .rpc();
        })
    }

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