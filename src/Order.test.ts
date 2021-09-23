import { Order, IClient, IItem, ICoupon, IOrder } from "./Order";

test("Should order with valid cpf", function () {
  const order = new Order();
  const client: IClient = { cpf: "40858881888" };
  const firstItem: IItem = { description: "chapéu", price: 50, quantity: 1 };
  const newOrder: IOrder = { client, items: [firstItem] };
  order.setOrder(newOrder);

  expect(order.getOrder()).toBe(newOrder);
});

test("Should order with three items", function () {
  const order = new Order();
  const client: IClient = { cpf: "40858881888" };
  const firstItem: IItem = { description: "chapéu", price: 50, quantity: 1 };
  const secondItem: IItem = {
    description: "calça",
    price: 100,
    quantity: 1,
  };
  const thirdItem: IItem = {
    description: "calça",
    price: 100,
    quantity: 2,
  };
  const coupon: ICoupon = { description: "c1", valueInPercent: 10 };
  const newOrder: IOrder = {
    client,
    items: [firstItem, secondItem, thirdItem],
    coupon,
  };
  order.setOrder(newOrder);

  expect(order.getOrder().amountWithDiscount).toBe(315);
});

test("Should order with coupon", function () {
  const order = new Order();
  const client: IClient = { cpf: "40858881888" };
  const firstItem: IItem = { description: "chapéu", price: 50, quantity: 1 };
  const coupon: ICoupon = { description: "c1", valueInPercent: 10 };
  const newOrder: IOrder = { client, items: [firstItem], coupon };
  order.setOrder(newOrder);

  expect(order.getOrder().amountWithDiscount).toBe(45);
});
