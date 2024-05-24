export const formatAmount = (amount) => {
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NPR",
    });
  
    return formatter.format(amount);
  };