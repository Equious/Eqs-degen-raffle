// have a function to enter the lottery
import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

export default function LotteryEntrance() {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis() // this provides the chainId in Hex
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const [entranceFee, setEntranceFee] = useState("0")
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")

    const dispatch = useNotification()

    const {
        runContractFunction: enterRaffle,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUI() {
        const entranceFeeFromCall = (
            await getEntranceFee({
                onError: (error) => console.log(error),
            })
        ).toString()

        const numPlayersFromCall = (
            await getNumberOfPlayers({ onError: (error) => console.log(error) })
        ).toString()
        const recentWinnerFromCall = await getRecentWinner({
            onError: (error) => console.log(error),
        })

        setEntranceFee(entranceFeeFromCall)
        setNumPlayers(numPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
        console.log(entranceFee)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "D'z nutz be cumin' for ya! Hide yo wife and kids!",
            title: "SURPRISE MUTHAFUCKA",
            position: "bottomR",
            icon: "cloud",
        })
    }

    return (
        <div>
            {raffleAddress ? (
                <div className="pt-2">
                    <div className="w-screen flex justify-center">
                        Entry only: {ethers.utils.formatUnits(entranceFee)}ETH!
                    </div>
                    <div className="w-screen flex justify-center">
                        <button
                            className="rounded-full bg-green-500 hover:bg-green-700 py-2 px-2 text-black font-bold mx-auto"
                            id="enterRaffle"
                            onClick={async function () {
                                await enterRaffle({
                                    onSuccess: handleSuccess,
                                    onError: (error) => console.log(error),
                                })
                            }}
                            disabled={isLoading || isFetching}
                        >
                            {isLoading || isFetching ? (
                                <div className="animate-spin border h-8 w-8 border-b-2 rounded-full"></div>
                            ) : (
                                <div>Enter Raffle!</div>
                            )}
                        </button>
                    </div>
                    <div className="w-screen flex justify-center">
                        Number of Players:{numPlayers}
                    </div>
                    <div className="w-screen flex justify-center">
                        Last Week's Winner: <a className="font-bold pl-1">{recentWinner}</a>{" "}
                    </div>
                    <div>
                        <a className="w-screen flex justify-center pl-2 font-style: italic text-2xl">
                            Congratulations!
                        </a>
                    </div>
                </div>
            ) : (
                <div> No Raffle Address Detected!</div>
            )}
        </div>
    )
}
