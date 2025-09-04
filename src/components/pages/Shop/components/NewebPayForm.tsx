import { useEffect, useRef } from "react";
export type NewebPayFormProps = {
  merchantID: string | null;
  merchantOrderNo: string | null;
  tradeInfo: string | null;
  tradeSha: string | null;
  version: string | null;
  payGateWay: string | null;
};

export default function NewebPayForm({
  merchantID,
  merchantOrderNo,
  tradeInfo,
  tradeSha,
  version,
  payGateWay,
}: NewebPayFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
    // submit form after all data is ready
    useEffect(()=>{
        console.log("newebPayForm", merchantID, merchantOrderNo, tradeInfo, tradeSha, version, payGateWay);
        if(merchantID && merchantOrderNo && tradeInfo && tradeSha && version && payGateWay){
        if(formRef.current){
        formRef.current.submit();
      }
    }
  }, [merchantID, merchantOrderNo, tradeInfo, tradeSha, version, payGateWay]);

  if(!merchantID || !merchantOrderNo || !tradeInfo || !tradeSha || !version || !payGateWay){
    return null;
  }

  return (
    <form
      action={payGateWay}
      method="post"
      ref={formRef}
    >
      <input type="hidden" name="MerchantID" value={merchantID} />
      <input type="hidden" name="MerchantOrderNo" value={merchantOrderNo} />
      <input type="hidden" name="TradeInfo" value={tradeInfo} />
      <input type="hidden" name="TradeSha" value={tradeSha} />
      <input type="hidden" name="Version" value={version} />
    </form>
  );
}
