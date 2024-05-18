
import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "./useWeb3"
import Environment from "../utils/ContractEnvironment";
import { getLaunchPadcontract } from "../utils/contractHelpers";




export const SetPlatFormFee = () => {
  const web3 = useWeb3();
  const tokenAddress = Environment?.LaunchpadContract;
  const contract = getLaunchPadcontract(tokenAddress, web3);
  const { account } = useWeb3React()
  const SetFee = useCallback(
    async (feefinal) => {
      // console.log("fee++++++++++++",adder, tokenID, fee)
      try {
        // var gasFunPrice;
        // web3.eth.getGasPrice().then((result) => {
        //   var result2 = parseInt(result)
        //   // // console.log("gasfun", typeof result2, result2)
        //   gasFunPrice = result2.toString()
        // })
        // const allowance = await approvecontract.methods.allowance(account, Environment.marketPlaceContract).call();
        // const neededAllowance = '100000000000000000000000000000';
        // if (parseInt(allowance) === 0) {
        //   const approveGas = await approvecontract.methods.approve(Environment.marketPlaceContract, neededAllowance).estimateGas({ from: account });
        //   await approvecontract.methods.approve(Environment.marketPlaceContract, neededAllowance).send({ from: account, gas: approveGas });
        // }
        // console.log("urirrrrrrrrrrrr", tokenID)
        // let weiAmount = web3.utils.toWei(fee.toString(), "ether")
        // console.log("sdsdfdsfsdfd",weiAmount)
        // let address2=JSON.stringify(adder)
        // console.log("final",typeof address2,tokenID)
        // const gas = await contract.methods.createMarketSale(adder, tokenID).estimateGas({ value: weiAmount, from: account, })
        const plateformfeeset = await contract.methods.setPlatformFeePercent(feefinal).send({ from: account })
        .on("transactionHash", (tx) => {
            return tx.transactionHash
          })
          .catch((error) => {
            throw error;
            console.log("error metamask here", error)
          });
        return plateformfeeset;
      } catch (e) {
        throw e;
      }
    },
    [contract, web3]
  );

  return { SetFee: SetFee };
};


export default SetPlatFormFee;
