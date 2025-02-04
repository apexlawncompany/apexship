const AVAIL_SERVICES = [
  {
    type: "text",
    text: "Print & Products",
    path: "/print-shipping-products",
    subcategories: [
      { id:"flyres-brochures", text: "Flyers & Brochures", path: "/print-shipping-products/flyers-brochures" },
      { id:"posters-vinyl", text: "Posters & Vinyl", path: "/print-shipping-products/posters-vinyl" },
      { id:"custom-packing", text: "Custom Packing", path: "/print-shipping-products/custom-packing" },
    ],
  },
  {
    type: "text",
    text: "Shipping & Courier",
    path: "/shipping-courier-service",
    subcategories: [
      {
        id:"direct-pickup",
        text: "Direct Pickup Shipping",
        path: "/shipping-courier-service/direct-pickup",
      },
      {
        id:"virtual-pickup",
        text: "Virtual Address & Mailboxes",
        path: "/shipping-courier-service/virtual-mailboxes",
      },
      { id:"drop-off", text: "Drop-Off Shipping", path: "/shipping-courier-service/drop-off" },
    ],
  },
  {
    type: "text",
    text: "Design & Marketing",
    path: "/design-marketing-service",
    subcategories: [
      { id:"advertising", text: "Advertising", path: "/design-marketing-service/advertising" },
      { id:"graphic-design", text: "Graphic Design", path: "/design-marketing-service/graphic-design" },
      { id:"web-development", text: "Web & App Development", path: "/design-marketing-service/web-app" },
    ],
  },
  {
    type: "text",
    text: "Signage & Mounting",
    path: "/signage-mounting",
    subcategories: [
      { id:"temporary-signage", text: "Temporary Signage", path: "/signage-mounting/temporary-signage" },
      { id:"permanent-signage", text: "Permanent Signage", path: "/signage-mounting/permanent-signage" },
      { id:"mounting", text: "Mounting", path: "/signage-mounting/mounting" },
    ],
  },
];

export default AVAIL_SERVICES;
