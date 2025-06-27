import React from 'react';
import SecondCard from './SecondCard';
import Marquee from "react-fast-marquee";
import { Clock, DollarSign, Shield } from 'lucide-react';

const DivMarque = () => {
  return (
    <div className='px-15'>
        <Marquee  gradient gradientColor="#ffffff">
            <div  className="py-15 space-x-7 flex px-3">
                <div>
                    <SecondCard
                    svg={<DollarSign className="w-12 h-12 text-green-500" />}
                    heading={"Best Market Price"}
                    para={
                        "Get up to 30% more than traditional scrap dealers. Our transparent pricing ensures you get the best value for your car."
                    }
                    />
                </div>
                <div>
                    <SecondCard
                    svg={<Clock className="w-12 h-12 text-blue-500" />}
                    heading={"Quick Process"}
                    para={
                        "Complete everything online in minutes. No haggling, no waiting. Get your money within 24 hours"
                    }
                    />
                </div>
                <div>
                    <SecondCard
                    svg={<Shield className="w-12 h-12 text-purple-500" />}
                    heading={"100% Legal & Safe"}
                    para={
                        "Government certified process. All paperwork handled professionally with complete legal compliance."
                    }
                    />
                </div>
                <div>
                    <SecondCard
                    svg={<DollarSign className="w-12 h-12 text-green-500" />}
                    heading={"Best Market Price"}
                    para={
                        "Get up to 30% more than traditional scrap dealers. Our transparent pricing ensures you get the best value for your car."
                    }
                    />
                </div>
                <div>
                    <SecondCard
                    svg={<Clock className="w-12 h-12 text-blue-500" />}
                    heading={"Quick Process"}
                    para={
                        "Complete everything online in minutes. No haggling, no waiting. Get your money within 24 hours"
                    }
                    />
                </div>
                <div>
                    <SecondCard
                    svg={<Shield className="w-12 h-12 text-purple-500" />}
                    heading={"100% Legal & Safe"}
                    para={
                        "Government certified process. All paperwork handled professionally with complete legal compliance."
                    }
                    />
                </div>
            </div>
        </Marquee>
    </div>
  )
}

export default DivMarque