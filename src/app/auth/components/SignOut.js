// import { useRouter } from "next/router";
import { signOut } from 'next-auth/react'

export async function SignOut() {
    try {
        signOut({ redirect: false }).then(() => {
            return 1;
        });
        return 0;
    } catch (error) {
        return 0;
    }
}