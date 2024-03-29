import React from "react";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export default function PlanCard({ price, period, offer, setOffer }) {
  return (
    <Card className="w-96 flex flex-col justify-around max-w-lg">
      <CardHeader className="pb-0">
        <div className="space-y-2 text-center">
          <div className="text-3xl font-bold flex justify-center space-x-2">
            <div>
              MAD {price}
            </div>
            <div className="text-sm leading-none text-gray-500 dark:text-gray-400">
            /{period === "1" ? "" : period} Month
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Unlimited access to all books
          </p>
        </div>
      </CardHeader>
      <CardContent className="pt-0 h-28">
        <div className="grid grid-cols-2 text-center">
          <div className="flex flex-col gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <span>Unlimited access</span>
            <span>Cancel anytime</span>
          </div>
          <div className="flex flex-col gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <span>No commitment</span>
            <span>Secure payments</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => {console.log(offer); setOffer(period)}} {...{disabled: offer === period}}  className={`w-full  "bg-green-500  disabled:bg-green-500 hover:bg-green-500 cursor-not-allowed"`}> {offer === period ? "Plan Choosed" : "Choose Plan"}</Button>
      </CardFooter>
    </Card>
  );
}
