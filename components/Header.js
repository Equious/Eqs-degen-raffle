import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div className="border-solid border-b-2 border-indigo-600 flex flex-row">
            <h1 className="font-blog text-3xl">
                <p>
                    <a className="underline decoration-pink-500">Eq's Degen Raffle!</a>
                </p>
            </h1>
            <div className="ml-auto py-2 px-4">
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    )
}
