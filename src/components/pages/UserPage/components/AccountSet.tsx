import AvatarSelect from "./AvatarSelect";
import FormModify from "./FormModify";

export default function AccountSet() {
  return (
    <section className="w-full  flex flex-col gap-10 ">
      <FormModify />
      <AvatarSelect
        onSelect={(avatar) => console.log("Selected Avatar:", avatar)}
        displayMode="price"
        info="目前頭像資訊"
      />
    </section>
  );
}
