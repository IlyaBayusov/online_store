import { IOrdersList } from "@/interfaces";
import OrdersList from "../OrdersList/OrdersList";

type Props = { order: IOrdersList };

export default function OrderItem({ order }: Props) {
  return <OrdersList key={order.orderId} products={order.orders} />;
}
