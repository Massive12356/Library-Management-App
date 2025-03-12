const TotalBooks = ({ count }) => {
  return (
    <div className="absolute top-28 right-160 w-13 h-13 bg-yellow-300 text-white rounded-full flex items-center justify-center shadow-lg">
      <div className="text-center text-zinc-700">
        <p className="text-xs font-semibold ">Total</p>
        <p className="text-xl font-bold">{count}</p>
      </div>
    </div>
  );
};

export default TotalBooks;
