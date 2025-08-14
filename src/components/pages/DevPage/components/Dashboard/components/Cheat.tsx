export default function Cheat() {
  return (
    <div className=" w-full p-6 bg-schema-surface-container rounded-3xl hover:scale-101 transition-transform duration-300 hover:shadow-lg">
      <h3 className="text-xl font-semibold mb-4">平均使用量</h3>

      <div className="grid grid-cols-3 gap-3 text-center my-auto">
        <div className="flex flex-col  justify-between border border-schema-tertiary rounded">
          <p className="bg-schema-tertiary p-2 text-black">所有試煉</p>
          <p className="text-bold p-2">
            13張 <span className="text-sm text-schema-on-surface ">/場</span>
          </p>
        </div>
        <div className="flex flex-col  justify-between border border-schema-secondary rounded">
          <p className="bg-schema-secondary p-2 text-black">成功試煉</p>
          <p className="text-bold p-2">
            13張 <span className="text-sm text-schema-on-surface ">/場</span>
          </p>
        </div>
        <div className="flex flex-col  justify-between border border-schema-primary rounded">
          <p className="bg-schema-primary p-2 text-black">失敗試煉</p>
          <p className="text-bold p-2">
            13張 <span className="text-sm text-schema-on-surface ">/場</span>
          </p>
        </div>
      </div>
    </div>
  );
}
