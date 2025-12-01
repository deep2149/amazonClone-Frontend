import React, { useEffect, useState } from "react";
import { api } from "@/utils/api";
import {Card} from "@/components/ui/card";

export default function Dashboard(){
    const [orderCount , setOrderCount] = useState(0)
    const [loading, setLoading] = useState(true);
    // const [error, setError] =useState("")

    useEffect(()=>{
        const fetchCounts= async()=>{
            try{
                setLoading(true);
                const res= await api.get("/admin/dashboardCount")
                if(typeof res.data.orderCount==="number")
                    setOrderCount(res.data.orderCount)
            }catch(err){
                console.error(err)
            }finally{
                setLoading(false)
            }
        }
        fetchCounts()
    }, []);


    return  (
        <div>
            <h1>Dashboard</h1>

            { loading ? 
                <p>loading..</p> :
                <div>
                    
                <Card label="Admin" count={orderCount}/>
                </div>
            }
        </div>
    )
    
}