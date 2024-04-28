import React, { useState, useContext, useEffect, useRef } from "react";

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import {
  List,
  ListItem,
  Card,
  Legend,
  LineChart,
  DonutChart,
  BarChart,
  AreaChart,
  ScatterChart,
  Select,
  SelectItem,
} from "@tremor/react";
import DataContext, {DataProvider} from './DataContext';
import Companies from "./Companies";
import AnnualReport from "./AnnualReport";
import AboutUs from "./AboutUs";
import ErrorPage from "./Error";
import "./App.css";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
// const chartdata = [
//   {
//     Country: "Argentina",
//     "Life expectancy": 76.3,
//     GDP: 13467.1236,
//     Population: 43417765,
//   },
//   {
//     Country: "Australia",
//     "Life expectancy": 82.8,
//     GDP: 56554.3876,
//     Population: 23789338,
//   },
//   {
//     Country: "Austria",
//     "Life expectancy": 81.5,
//     GDP: 43665.947,
//     Population: 8633169,
//   },
//   {
//     Country: "Brazil",
//     "Life expectancy": 75,
//     GDP: 8757.2622,
//     Population: 2596218,
//   },
//   {
//     Country: "Estonia",
//     "Life expectancy": 77.6,
//     GDP: 1774.9291,
//     Population: 131547,
//   },
//   {
//     Country: "Ethiopia",
//     "Life expectancy": 64.8,
//     GDP: 645.4637627,
//     Population: 9987333,
//   },
//   {
//     Country: "Germany",
//     "Life expectancy": 81,
//     GDP: 41176.88158,
//     Population: 81686611,
//   },
//   {
//     Country: "Honduras",
//     "Life expectancy": 74.6,
//     GDP: 2326.15856,
//     Population: 896829,
//   },
//   {
//     Country: "Italy",
//     "Life expectancy": 82.7,
//     GDP: 349.14755,
//     Population: 673582,
//   },
//   {
//     Country: "Lithuania",
//     "Life expectancy": 73.6,
//     GDP: 14252.42853,
//     Population: 29491,
//   },
//   {
//     Country: "Mexico",
//     "Life expectancy": 76.7,
//     GDP: 9143.128494,
//     Population: 12589949,
//   },
//   {
//     Country: "Norway",
//     "Life expectancy": 81.8,
//     GDP: 7455.24654,
//     Population: 518867,
//   },
//   {
//     Country: "Philippines",
//     "Life expectancy": 68.5,
//     GDP: 2878.33837,
//     Population: 11716359,
//   },
//   {
//     Country: "Samoa",
//     "Life expectancy": 74,
//     GDP: 4149.363444,
//     Population: 193759,
//   },
//   {
//     Country: "Sao Tome and Principe",
//     "Life expectancy": 67.5,
//     GDP: 1624.63963,
//     Population: 195553,
//   },
//   {
//     Country: "Senegal",
//     "Life expectancy": 66.7,
//     GDP: 98.7256145,
//     Population: 14976994,
//   },
//   {
//     Country: "Switzerland",
//     "Life expectancy": 83.4,
//     GDP: 89899.8424,
//     Population: 8282396,
//   },
//   {
//     Country: "Tajikistan",
//     "Life expectancy": 69.7,
//     GDP: 918.6771543,
//     Population: 8548651,
//   },
//   {
//     Country: "Ukraine",
//     "Life expectancy": 71.3,
//     GDP: 2124.662666,
//     Population: 4515429,
//   },
//   {
//     Country: "Uruguay",
//     "Life expectancy": 77,
//     GDP: 15524.84247,
//     Population: 3431552,
//   },
//   {
//     Country: "Zimbabwe",
//     "Life expectancy": 67,
//     GDP: 118.69383,
//     Population: 15777451,
//   },
// ];
const GoogleMap = () => {
    const googleMapRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const initMap = () => {
      
        fetch('locations.json')
          .then(response => response.json())
          .then(jsonData => {
            const map = new google.maps.Map(googleMapRef.current!, {
              center: { lat: 33.7490, lng: -84.3880 },
              zoom: 11
            });
            const heatmapData = jsonData.locations.map((item: any) => new google.maps.LatLng(parseFloat(item.latitude), parseFloat(item.longitude)));
            console.log("Number of data points in heatmap:", heatmapData.length);
            const heatmap = new google.maps.visualization.HeatmapLayer({
              data: heatmapData,
              map: map,
              radius: 30
            });
            console.log(heatmap)
          });
      };
      const scriptId = 'google-maps-script';
      const existingScript = document.getElementById(scriptId) as HTMLScriptElement;
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD-cQkVQiCzurIlUsXMx8ewsTmlPqwcmqQ&callback=initMap&libraries=visualization';
        script.id = scriptId;
        script.defer = true;
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => {
          initMap();
        };
      } else if (existingScript && !window.google) {
        existingScript.onload = () => initMap();
      } else {
        initMap();
      }
      return () => {
        existingScript?.remove();
      };
    }, []);
    return <div id="google-map" ref={googleMapRef} style={{ height: '500px', width: '100%' }} />;
   };

// some bs data i made up
const startupsByYear = [
  { year: "2018", startups: 120 },
  { year: "2019", startups: 150 },
  { year: "2020", startups: 180 },
  { year: "2021", startups: 200 },
  { year: "2022", startups: 230 },
  { year: "2023", startups: 250 },
];

const totalFundingByYear = [
  { date: "Jan 23", "Total Funding": 500, "Pre-Seed Funding": 100 },
  { date: "Feb 23", "Total Funding": 600, "Pre-Seed Funding": 120 },
  { date: "Mar 23", "Total Funding": 700, "Pre-Seed Funding": 130 },
  { date: "Apr 23", "Total Funding": 800, "Pre-Seed Funding": 140 },
  { date: "May 23", "Total Funding": 900, "Pre-Seed Funding": 150 },
  { date: "Jun 23", "Total Funding": 950, "Pre-Seed Funding": 160 },
  { date: "Jul 23", "Total Funding": 1000, "Pre-Seed Funding": 170 },
  { date: "Aug 23", "Total Funding": 1050, "Pre-Seed Funding": 180 },
  { date: "Sep 23", "Total Funding": 1100, "Pre-Seed Funding": 190 },
  { date: "Oct 23", "Total Funding": 1150, "Pre-Seed Funding": 200 },
  { date: "Nov 23", "Total Funding": 1200, "Pre-Seed Funding": 210 },
  { date: "Dec 23", "Total Funding": 1250, "Pre-Seed Funding": 220 },
];

const fundingByYearSummary = [
  {
    name: "Total Funding",
    value: 11200,
  },
  {
    name: "Pre-Seed Funding",
    value: 1970,
  },
];

const valueFormatter = (number: number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

const statusColor: { [key: string]: string } = {
  "Total Funding": "bg-blue-500",
  "Pre-Seed Funding": "bg-violet-500",
};

const startupsByIndustry = [
  { industry: "Technology", value: 40 },
  { industry: "Healthcare", value: 30 },
  { industry: "Finance", value: 15 },
  { industry: "Education", value: 10 },
  { industry: "Other", value: 5 },
];

const percentFormatter = (number: number) => {
  return number + "%";
};

const startupsBySize = [
  { size: "1-10", startups: 150 },
  { size: "11-50", startups: 100 },
  { size: "51-200", startups: 50 },
  { size: "201+", startups: 25 },
];

const cardData = [
  {
    name: "Ecosystem Value",
    stat: "$200.5 bn",
    change: "+12.5%",
    changeType: "positive",
  },
  {
    name: "Total Funding Rounds",
    stat: "2400",
    change: "+1.8%",
    changeType: "positive",
  },
  {
    name: "New Jobs Created",
    stat: "369",
    change: "+19.7%",
    changeType: "positive",
  },
  {
    name: "Average Software Engineer Salary",
    stat: "$104k",
    change: "+19.7%",
    changeType: "positive",
  },
];

const ScatterChartUsageExampleWithClickEvent = () => {
  const data = useContext(DataContext);
  const [xAxis, setXAxis] = useState('totalFunding');
  const [yAxis, setYAxis] = useState('launchYear');
  const [size, setSize] = useState('amount');

  const updateChartData = (jsonData) => {
    return jsonData.filter(item => 
      item[xAxis] != null && item[yAxis] != null && item[size] != null
    ).map((item, index) => ({
      ...item,
      x: item[xAxis],
      y: item[yAxis],
      size: item[size] || 1,
      uniqueKey: `point-${index}`
    }));
  };

  const chartData = data ? updateChartData(data) : [];

  
  const axisOptions = {
    "Ecosystem Value": "current_company_valuation",
    "Funding Rounds": "total_rounds_number",
    "Total Funding": "amount", // need to add this to master table
    // "Number of Startups per Year": "numberOfStartups",
    // "Minority-founded Startups": "minorityStartups",
    // "Type of Startup": "startupType",
    "Funding Year" : "launch_year",
    "Round Evaluation": "round_valuation_usd",
    // GDP: "GDP",
    // "Life expectancy": "Life expectancy",
    // Population: "Population",
  };

  return (
    <Card>
      <div style={{ marginBottom: 16, color: "white" }}>
        <label>X-axis:</label>
        <Select value={xAxis} onValueChange={setXAxis}>
          {Object.entries(axisOptions).map(([label, value]) => (
            <SelectItem value={value} key={value}>
              {label}
            </SelectItem>
          ))}
        </Select>

        <label>Y-axis:</label>
        <Select value={yAxis} onValueChange={setYAxis}>
          {Object.entries(axisOptions).map(([label, value]) => (
            <SelectItem value={value} key={value}>
              {label}
            </SelectItem>
          ))}
        </Select>

        <label>Size:</label>
        <Select value={size} onValueChange={setSize}>
          {Object.entries(axisOptions).map(([label, value]) => (
            <SelectItem value={value} key={value}>
              {label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <ScatterChart
        className="-ml-2 mt-6 h-80"
        yAxisWidth={50}
        data={chartData}
        category="name"
        x={xAxis}
        y={yAxis}
        size={size}
        showOpacity={true}
        minYValue={0}
        showLegend={false}
        valueFormatter={{
        //   x: (amount) => `$${(amount / 1000).toFixed(1)}K`,
        y: (amount) => `${amount/100000} $`,
        //   size: (amount) => `${(amount / 1000000).toFixed(1)}M people`,
        }}
      />
    </Card>
  );
}





const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <div>
          <nav className="bg-slate-900 text-white p-4">
            <ul className="flex space-x-10">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/companies">Companies</Link>
              </li>
              <li>
                <Link to="/annual-report">Annual Report</Link>
              </li>
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="mb-8 flex justify-center w-full">
                    <h1 className="text-3xl font-bold text-cyan-200">
                      Atlanta Tech Ecosystem Dashboard
                    </h1>
                  </div>
                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {cardData.map((item) => (
                      <Card key={item.name} className="mb-5">
                        <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
                          {item.name}
                        </p>
                        <div className="mt-2 flex items-baseline space-x-2.5">
                          <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            {item.stat}
                          </p>
                          <span
                            className={classNames(
                              item.changeType === "positive"
                                ? "text-emerald-700 dark:text-emerald-500"
                                : "text-red-700 dark:text-red-500",
                              "text-tremor-default font-medium"
                            )}
                          >
                            {item.change}
                          </span>
                        </div>
                      </Card>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h2 className="text-xl font-bold mb-2 text-cyan-200">
                        New Startups per Year
                      </h2>
                      <LineChart
                        data={startupsByYear}
                        index="year"
                        categories={["startups"]}
                      />
                      <div className="text-center mt-2 text-white">Year</div>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold mb-2 text-cyan-200">
                        Startups by Size
                      </h2>
                      <BarChart
                        data={startupsBySize}
                        index="size"
                        categories={["startups"]}
                      />
                      <div className="text-center mt-2 text-white">
                        Company Size
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-2 text-cyan-200">
                        Total Funding (in millions)
                      </h3>
                      <AreaChart
                        data={totalFundingByYear}
                        index="date"
                        categories={["Total Funding", "Pre-Seed Funding"]}
                        colors={["blue", "violet"]}
                        valueFormatter={valueFormatter}
                        showLegend={false}
                        showYAxis={true}
                        showGradient={true}
                        startEndOnly={false}
                        className="mt-6 h-60"
                      />
                      <List className="mt-2">
                        {fundingByYearSummary.map((item) => (
                          <ListItem key={item.name}>
                            <div className="flex items-center space-x-2">
                              <span
                                className={classNames(
                                  statusColor[item.name],
                                  "h-0.5 w-3"
                                )}
                                aria-hidden="true"
                              />
                              <span>{item.name}</span>
                            </div>
                            <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                              {valueFormatter(item.value)}
                            </span>
                          </ListItem>
                        ))}
                      </List>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <h2 className="text-xl font-bold mb-4 text-cyan-200">
                        Startups by Industry
                      </h2>
                      <div className="w-64 h-64">
                        <DonutChart
                          data={startupsByIndustry}
                          category="value"
                          index="industry"
                          variant="pie"
                          valueFormatter={percentFormatter}
                          colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
                          className="mt-2 h-60"
                        />
                      </div>

                      <div>
                        <Legend
                          categories={[
                            "Technology",
                            "Healthcare",
                            "Finance",
                            "Education",
                            "Other",
                          ]}
                          colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
                          className="max-w-xs text-center"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="scatter-chart-container">
                    <ScatterChartUsageExampleWithClickEvent />
                  </div>
                  <div className="map-container" style={{ marginTop: '20px'}}>
                 <GoogleMap />
                  </div>
                </>
              }
            />
            <Route path="/companies" element={<Companies />} />
            <Route path="/annual-report" element={<AnnualReport />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <div className="bg-gray-800 text-white p-4 text-center mt-auto rounded-lg">
            <p>If you have any questions, please don't hesitate to contact us at <a href="mailto: dashboardcoa@gmail.com" className="text-cyan-300 hover:underline">dashboardcoa@gmail.com</a></p>
          </div>

        </div>
      </Router>
    </DataProvider>
  );
};

export default App;
