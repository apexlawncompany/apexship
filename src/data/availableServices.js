const AVAIL_SERVICES = [
  {
    type: "text",
    text: "Print & Products",
    path: "/print-shipping-products",
    subcategories: [
      { text: "Flyers & Brochures", path: "/print-products/flyers-brochures" },
      { text: "Posters & Vinyl", path: "/print-products/posters-vinyl" },
      { text: "Custom Packing", path: "/print-products/custom-packing" },
    ],
  },
  {
    type: "text",
    text: "Shipping & Courier",
    path: "/shipping-courier-service",
    subcategories: [
      {
        text: "Direct Pickup Shipping",
        path: "/shipping-courier/direct-pickup",
      },
      {
        text: "Virtual Address & Mailboxes",
        path: "/shipping-courier/virtual-mailboxes",
      },
      { text: "Drop-Off Shipping", path: "/shipping-courier/drop-off" },
    ],
  },
  {
    type: "text",
    text: "Design & Marketing",
    path: "/design-marketing-service",
    subcategories: [
      { text: "Advertising", path: "/design-marketing/advertising" },
      { text: "Graphic Design", path: "/design-marketing/graphic-design" },
      { text: "Web & App Development", path: "/design-marketing/web-app" },
    ],
  },
  {
    type: "text",
    text: "Signage & Mounting",
    path: "/signage-mounting",
    subcategories: [
      { text: "Temporary Signage", path: "/signage-mounting/temporary" },
      { text: "Permanent Signage", path: "/signage-mounting/permanent" },
      { text: "Mounting", path: "/signage-mounting/mounting" },
    ],
  },
];

export default AVAIL_SERVICES;
