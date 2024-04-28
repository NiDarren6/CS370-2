import React from "react";
import { RiMedal2Fill, RiTeamFill, RiBuilding2Fill } from "@remixicon/react";

const AnnualReport: React.FC = () => {
  return (
    <div className="bg-slate-900 text-gray-300 min-h-screen p-8 font-sans">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h1 className="text-6xl font-bold mb-4 text-left text-cyan-200">
            Atlanta's Startup Ecosystem
          </h1>
          <div className="flex items-center gap-4 mb-5">
            <div className="flex items-center">
              <RiMedal2Fill className="text-yellow-400" />
              <p className="text-2xl"> #29 in Global</p>
            </div>
            <div className="flex items-center">
              <RiMedal2Fill className="text-green-400" />
              <p className="text-2xl"> #13 in North America</p>
            </div>
            <div className="flex items-center">
              <RiMedal2Fill className="text-red-400" />
              <p className="text-2xl"> #2 in the Southern USA</p>
            </div>
          </div>
          <p className="text-left text-xl mb-5">
            Over the past decade, Atlanta’s startup ecosystem has slowly gained
            traction. More than a dozen companies that started or are based in
            Atlanta have grown to valuations above $1 billion. With this rise in
            unicorn status, investors and VCs have followed the move to our city
            to source companies. Today, according to the Metro Atlanta Chamber
            of Commerce, the city is home to more than 13,000 tech companies.
          </p>
          <div>
            <img
              src="/src/assets/atl_skyline.jpg"
              className="mb-4 w-full h-auto"
            />
          </div>
        </div>

        <div className="text-left">
          <h2 className="text-3xl font-bold mb-4 font-sans text-cyan-200">
            Highlights
          </h2>
          <h1 className="textxl mb-5">
            The future of technology, the future of innovation, and the the
            future of entrepreneurship. Our mission is to accelerate the growth
            of Atlanta’s tech ecosystem while constructing thriving economic
            pathways for every Atlanta resident.
          </h1>

          <ul className="list-disc pl-5 text-large">
            <li className="mb-1">
              <strong className="text-cyan-400">
                Growing Innovation Structure:
              </strong>{" "}
              Atlanta has become appealing to a corporate innovation
              environment, attracting 12 new corporate satellite offices since
              2017 from companies including Microsoft, Google, Visa, Nike, and
              NCR as innovation infrastructure has been developed.
            </li>
            <p></p>
            <li className="mb-1">
              <strong className="text-cyan-400">Research Expenditure:</strong>{" "}
              Atlanta’s universities commercialize their innovation at a smaller
              scale compared to top tier programs in other cities, despite
              comparable research expenditures with schools such as MIT.
              Atlanta’s universities have the talent and research funding to
              capitalize on innovation but would benefit from greater
              coordination and focus on commercialization.
            </li>
            <p></p>
            <li className="mb-1">
              <strong className="text-cyan-400">Promising Talent:</strong> The
              city has promising entrepreneurship “piping” with talent, over 13K
              yearly tech graduates from Atlanta universities, and ample
              research funding to generate IP, with a total of $2B+ yearly
              research expenditure at Georgia Tech and Emory, but the city must
              invest in its ecosystem.
            </li>
            <p></p>
            <li className="mb-1">
              <strong className="text-cyan-400">
                Start-up Infrastructure:
              </strong>{" "}
              The city is on par with its peers in several offerings: number of
              incubators and accelerators, number of formal mentorship programs,
              and annual startup-focused events. However, Atlanta’s
              entrepreneurial offerings are decentralized compared to other tech
              hubs, with a median distance of 5.9 miles between incubators, VC
              firms, and universities, far more than the 2.3 miles in Austin and
              1.4 miles in Chicago.
            </li>
          </ul>
          <h2 className="text-3xl font-bold text-center mt-5 font-sans text-cyan-200">
            Reasons to Move Your Startup to Atlanta
          </h2>
          <div className="grid grid-cols-2 text-center mt-5 gap-4">
            <div>
              <RiTeamFill className="text-xl text-red-500 mx-auto" />
              <h3 className="font-bold text-xl text-red-200">
                High-Quality Talent
              </h3>
              <p className="text-large text-left">
                Atlanta's educational powerhouses, such as Georgia Tech and
                Emory, produce over
                <strong className="text-red-200"> 13,000</strong> graduates
                annually, but there are currently only enough jobs to employ
                roughly <strong className="text-red-200"> 20%</strong> of these
                tech graduates. This talent surplus creates a prime opportunity
                for startups. By establishing your business in Atlanta, you can
                tap into this underutilized pool of fresh, skilled talent right
                where they're trained. potential.
              </p>
            </div>
            <div>
              <RiBuilding2Fill className="text-xl text-green-500 mx-auto" />
              <h3 className="font-bold text-xl text-green-200">
                Growing Infrastructure
              </h3>
              <p className="text-large text-left">
                Atlanta's rich ecosystem offers numerous resources like
                incubators, accelerators, and formal mentorship programs, making
                it an appealing destination for startups. With a robust
                infrastructure, <strong className="text-green-200"> 33</strong>{" "}
                incubators and regular startup-focused events occur every two
                weeks, but the investment engagement has room for additional
                start-ups, as only two incubators had more than 30 investments
                as of 2022, providing a fertile ground for new ventures to
                thrive.
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="text-center mt-6">
      <p className="text-sm">Credits: Boston Consulting Group, Startup Genome, and DealRoom</p>
      </footer>
    </div>
  );
};

export default AnnualReport;
