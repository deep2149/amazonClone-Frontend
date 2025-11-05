import { ShoppingCart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(){



    return(
        <>
        <div className="flex flex-row justify-between">
            {/* <ul className="flex gap-5 ">
                <li><Link to="/order">Order</Link></li>
                <li><Link to="/products">Product</Link></li>
                <li><Link to="/cart"><ShoppingCart/></Link></li>
            </ul> */}
            <div>1</div><div>2</div>
        </div>
        </>
    )
}