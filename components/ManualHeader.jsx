import {useMoralis} from "react-moralis"
import { useEffect, useInsertionEffect } from "react"


export default function ManualHeader(){

    const {enableWeb3, account,isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading} = useMoralis()
    
    useEffect(() => {
        if(isWeb3Enabled) return

        if(typeof window != "undefined"){

            if(window.localStorage.getItem("connected")){
                enableWeb3()
            }
        }
    }, [isWeb3Enabled])
    // if do dependency array is provided: will run anytime something re-renders
    //CAREFUL withh this! It can result in circular renders.
    //blank dependency array: run once on load

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if(account == null){
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null account found.")
            }
        })
    })

    return(<div>
        {account ? (<div>
            You're connected! with {account.slice(0,6)}...{account.slice(account.length - 4)}
        </div>
        ) : (
        <button onClick={async () => {
            await enableWeb3()
            if(typeof window != "undefined"){
                window.localStorage.setItem("connected", "injected")
            }
            
            }} disabled={isWeb3EnableLoading}>
            
            Connect
            
        </button>)}
        
    </div>)
}

