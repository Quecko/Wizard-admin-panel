import { useCallback } from "react";
import useWeb3 from "./useWeb3"
import Environment from "../utils/ContractEnvironment";
import { getLaunchPadcontract } from "../utils/contractHelpers";

export const PlateFormfee = () => {
  const web3 = useWeb3();
  const tokenAddress = Environment?.LaunchpadContract;
  const contract = getLaunchPadcontract(tokenAddress, web3);
  const GetFee = useCallback(async () => {
    const approved = await contract.methods.platformFee().call();
    return approved;
  }, [contract, web3]);

  return { GetFee: GetFee };
};

export default PlateFormfee;