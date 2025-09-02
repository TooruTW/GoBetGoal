import { useEffect, useRef } from "react";
type NewebPayFormProps = {
  merchantID: string;
  merchantOrderNo: string;
  tradeInfo: string;
  tradeSha: string;
  version: string;
  payGateWay: string;
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
        if(merchantID && merchantOrderNo && tradeInfo && tradeSha && version && payGateWay){
        if(formRef.current){
        formRef.current.submit();
      }
    }
  }, [merchantID, merchantOrderNo, tradeInfo, tradeSha, version, payGateWay]);

  return (
    <form
      action="http://ccore.newebpay.com/MPG/mpg_gateway"
      method="post"
      ref={formRef}
    >
      <input type="hidden" name="merchantID" value={merchantID} />
      <input type="hidden" name="merchantOrderNo" value={merchantOrderNo} />
      <input type="hidden" name="tradeInfo" value={tradeInfo} />
      <input type="hidden" name="tradeSha" value={tradeSha} />
      <input type="hidden" name="version" value={version} />
      <input type="hidden" name="payGateWay" value={payGateWay} />
    </form>
  );
}
