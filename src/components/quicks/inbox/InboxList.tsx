import InboxCard from "./InboxCard";

export default function InboxList() {
  return (
    <div className="grid grid-cols-1 divide-y divide-gray-400">
      {[...Array(5)].map((_, i) => (
        <InboxCard key={i} />
      ))}
    </div>
  );
}
