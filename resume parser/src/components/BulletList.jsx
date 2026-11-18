// A reusable bulleted list, used for strengths and weaknesses.
export default function BulletList({ items }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-300">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
