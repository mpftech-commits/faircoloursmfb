import { FileEdit, Camera, UserIcon, Briefcase } from "lucide-react";
import type { ReactNode } from "react";

type viewdetailsprop = {
id: number;
name?: string;
description?: string;
title?: string;
features?: Array<string>;
price?: string;
tag?: string;
icon?: ReactNode;
}

export const viewdetails :viewdetailsprop[] = [
     {
        id: 1,
        icon: <FileEdit size={18} className="m-auto mt-2.5 text-green-600"/>,
        name: "Government ID",
        description: "NG-1234567890"
    },
     {
        id: 2,
        icon: <Camera size={18} className="m-auto mt-2.5 text-green-600"/> ,
        name: "Safe Verification",
        description: "Completed"
    },
     {
        id: 3,
        icon: <UserIcon size={18} className="m-auto mt-2.5 text-green-600"/> ,
        name: "Full Name",
        description: "John Doe"
    },
     {
        id: 4,
        icon: <Briefcase size={18} className="m-auto mt-2.5 text-green-600"/> ,
        name: "Area of Operation",
        description: "Lekki, Lagos"
    },
]

export const listings = [
  {
    id: 1,
    title: "3 Bedroom Flat",
    location: "Lekki Phase 1",
    bedrooms: 3,
    price: "₦800,000",
    status: "Approved",
    image: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d",
  },
  {
    id: 2,
    title: "2 Bedroom Apartment",
    location: "Lekki Phase 1",
    bedrooms: 3,
    price: "₦800,000",
    status: "Pending",
    image: "https://images.unsplash.com/photo-1501183638710-841dd1904471",
  },
  {
    id: 3,
    title: "2 Bedroom Apartment",
    location: "Lekki Phase 1",
    bedrooms: 3,
    price: "₦800,000",
    status: "Rented",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  },
  {
    id: 4,
    title: "1 Bedroom Apartment",
    location: "Lekki Phase 1",
    bedrooms: 1,
    price: "₦800,000",
    status: "Removed",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
  },
];

export const subscriptionPlans: viewdetailsprop[] = [
{
  id: 1,
  title: "Basic",
  price: "₦2,000",
  features: [
    "Up to 5 active listings",
    "Standard Visibility",
    "Basic Support",
    "Trust Score Display"
  ]
},
{
id: 2,
title: "Standard",
price: "₦5,000",
tag: "Most Popular",
features: [
  "Up to 15 active listings",
  "Enhanced Visibility",
  "Priority Support",
  "10% Trust Score Boost",
  "Featured Badge"
]
},
{
id: 3,
title: "Pro",
price: "₦10,000",
features: [
  "Unlimited active listings",
  "Maximum Visibility",
  "24/7 premium Support",
  "20% Trust Score Boost",
  "Verified Badge",
  "Analytics dashboard"
]
},

]