import AvatarSelect from "./AvatarSelect";
import FormModify from "./FormModify";

export default function AccountSet() {
  return (
    <section className="">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold py-4">編輯檔案</h2>
        <input
          type="submit"
          value="修改"
          className=" cursor-pointer rounded-full   px-10  bg-gradient-set-1 hover:scale-105 transition-all duration-300  disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <FormModify onRegisterError={() => {}} onRegisterSuccess={() => {}} />
      <h2 className="text-lg font-semibold pb-4 pt-10">編輯頭像</h2>
      <AvatarSelect onSelect={() => {}} selectedAvatar={null} />
    </section>
  );
}
