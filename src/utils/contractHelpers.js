// import CreaterAbi from '@/utils/CreaterAbi.json';
import Launchpad from '../utils/LaunchpadAbi';
import web3NoAccount from './web3'

const getContract = (abi, address, web3) => {
    const _web3 = web3 ?? web3NoAccount;
    // console.log('_web3',_web3);
    return new _web3.eth.Contract(abi, address)
}

// export const getCreatersContract = (address, web3) => {
//     return getContract(CreaterAbi, address, web3)
// }
export const getLaunchPadcontract = (address, web3) => {
    return getContract(Launchpad, address, web3)
}