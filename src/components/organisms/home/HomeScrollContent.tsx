import CardListPost from "@/components/molecules/card/CardListPost";
import MessageInput from "@/components/molecules/message/MessageInput";

export default function HomeScrollContent() {
  return (
    <div className="flex flex-col gap-6">
      <MessageInput />
      <CardListPost />
      <CardListPost />
      <CardListPost />
      <CardListPost />
      <CardListPost />
      <CardListPost />
      <CardListPost />
    </div>
  );
}
