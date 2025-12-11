export default function Card({ title, value, color }) {
  return (
    <div className={`p-6 rounded-xl shadow flex flex-col ${color} text-white`}>
      <span className="font-medium">{title}</span>
      <span className="text-2xl font-bold mt-2">{value}</span>
    </div>
  );
}
