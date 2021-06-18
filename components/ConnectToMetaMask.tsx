import { GlobalContext } from 'context/GlobalState'
import { useContext } from 'react'

export default function ConnectToMetaMask() {
  const { state, dispatch } = useContext(GlobalContext)
  // EIP 1102 - Opt-in account exposure
  // How to connect to an user's wallet
  // https://eips.ethereum.org/EIPS/eip-1102
  async function connetToMetaMask() {
    try {
      let accounts = await window.ethereum
        .request({
          method: 'eth_requestAccounts',
        })
        .catch((err: Error) => console.error(err))
      dispatch({ type: 'METAMASK', payload: accounts[0] })
    } catch (err) {
      // EIP-1193: Ethereum Provider JavaScript API
      // All provider error types can be checked here: https://eips.ethereum.org/EIPS/eip-1193#provider-errors
      console.error(err)
    }
  }

  return (
    <button
      disabled={state.metamask.address !== ''}
      className={`transition px-3 py-2 rounded ring-1 ring-yellow-300 ${
        state.metamask.address !== ''
          ? 'cursor-not-allowed'
          : 'hover:ring-yellow-600'
      }`}
      onClick={async () => await connetToMetaMask()}
    >
      Connect to MetaMask
    </button>
  )
}