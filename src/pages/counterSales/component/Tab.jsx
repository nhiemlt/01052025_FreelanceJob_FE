export default function Tab({ orders, currentTab, setCurrentTab }) {
  return (
    <div className="flex border-b">
      {orders.map((orders, index) => (
        <button
          key={orders.id}
          onClick={() => setCurrentTab(index)}
          className={`px-4 py-2 focus:outline-none ${currentTab === index ? "border-b-2 border-blue-500 font-bold" : ""}`}
        >
          {orders.name}
        </button>
      ))}
    </div>
  );
}
