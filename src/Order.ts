export interface IOrder {
  client: IClient;
  items: IItem[];
  coupon?: ICoupon;
  amount?: number;
  amountWithDiscount?: number;
}

export interface IClient {
  cpf: string;
}

export interface IItem {
  description: string;
  price: number;
  quantity: number;
}

export interface ICoupon {
  description: string;
  valueInPercent: number;
}

export class Order {
  order: IOrder = <IOrder>{};

  getOrder() {
    return this.order;
  }

  setOrder(order: IOrder) {
    const isCpfValid = this.validateCpf(order.client.cpf);
    if (!isCpfValid) {
      return false;
    }
    order.amount = this.calculateAmount(order.items);
    if (order.coupon) {
      order.amountWithDiscount = this.calculateAmountWithDiscount(
        order.amount,
        order.coupon.valueInPercent
      );
    }
    this.order = order;
  }

  private validateCpf(str: string) {
    if (str !== null) {
      if (str !== undefined) {
        if (str.length >= 11 || str.length <= 14) {
          str = str
            .replace(".", "")
            .replace(".", "")
            .replace("-", "")
            .replace(" ", "");

          if (!str.split("").every((c) => c === str[0])) {
            try {
              let d1, d2;
              let dg1, dg2, rest;
              let digito;
              let nDigResult;
              d1 = d2 = 0;
              dg1 = dg2 = rest = 0;

              for (let nCount = 1; nCount < str.length - 1; nCount++) {
                digito = parseInt(str.substring(nCount - 1, nCount));
                d1 = d1 + (11 - nCount) * digito;

                d2 = d2 + (12 - nCount) * digito;
              }

              rest = d1 % 11;

              dg1 = rest < 2 ? (dg1 = 0) : 11 - rest;
              d2 += 2 * dg1;
              rest = d2 % 11;
              if (rest < 2) dg2 = 0;
              else dg2 = 11 - rest;

              let nDigVerific = str.substring(str.length - 2, str.length);
              nDigResult = "" + dg1 + "" + dg2;
              return nDigVerific == nDigResult;
            } catch (e) {
              console.error("Erro !" + e);

              return false;
            }
          } else return false;
        } else return false;
      }
    } else return false;
  }

  calculateAmount(items: IItem[]): number {
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  }

  calculateAmountWithDiscount(amount: number, valueInPercent: number): number {
    return amount - amount * (valueInPercent / 100);
  }
}
