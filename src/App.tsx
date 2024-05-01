import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
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
import DataContext, { DataProvider } from "./DataContext";
import Companies from "./Companies";
import AnnualReport from "./AnnualReport";
import AboutUs from "./AboutUs";
import ErrorPage from "./Error";
import "./App.css";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const GoogleMap = () => {
  const googleMapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        const response = await fetch('/api/map');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        if (!jsonData || jsonData.length === 0) {
          throw new Error('No data received');
        }


        const map = new google.maps.Map(googleMapRef.current!, {
          center: { lat: 33.8505, lng: -84.3719 },
          zoom: 11
        });
        const heatmapData = jsonData.map(item => new google.maps.LatLng(parseFloat(item.latitude), parseFloat(item.longitude)));
        console.log("Number of data points in heatmap:", heatmapData.length);
        console.log(jsonData);

        new google.maps.visualization.HeatmapLayer({
          data: heatmapData,
          map: map,
          radius: 70,
          opacity: 0.8
        });
      } catch (error) {
        console.error('Failed to load heatmap data:', error);
      }
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

// data queried from database
const startupsByYear = [
  { year: "2018", "Start-ups": 451 },
  { year: "2019", "Start-ups": 274 },
  { year: "2020", "Start-ups": 266 },
  { year: "2021", "Start-ups": 190 },
  { year: "2022", "Start-ups": 53 },
  { year: "2023", "Start-ups": 21 },
];
const startupsByIndustry = [
  { industry: "Healthcare", value: 23.2 },
  { industry: "FinTech", value: 19.0 },
  { industry: "Enterprise Software", value: 15.2 },
  { industry: "Security", value: 9.8 },
  { industry: "Transportation", value: 7.0 },
  { industry: "Media", value: 6.3 },
  { industry: "Other", value: 19.5 },
];

const cardData = [
  {
    name: "Ecosystem Value",
    stat: "$56 bn",
    change: "62% above global avg",
    changeType: "positive",
  },
  {
    name: "Total Startups",
    stat: "2400",
    change: "20% above national avg",
    changeType: "positive",
  },
  {
    name: "Minority Startups",
    stat: "67",
    change: "45% above national avg",
    changeType: "positive",
  },
  {
    name: "Number of Unicorns",
    stat: "7",
    // change: "+9.4% YoY",
    // changeType: "positive",
  },
];

const ecosystemValueByCity = [
  { city: "Austin", "Ecosystem Value": 70 },
  { city: "Atlanta", "Ecosystem Value": 56 },
  { city: "Dallas", "Ecosystem Value": 44 },
  { city: "Monteal", "Ecosystem Value": 38 },
  { city: "Charlotte", "Ecosystem Value": 11 },
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

const percentFormatter = (number: number) => {
  return number + "%";
};

function getMedianValue(value) {
  if (value && value.includes("-")) {
    const parts = value.split("-").map((part) => parseFloat(part.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return (parts[0] + parts[1]) / 2;
    }
  }
  return parseFloat(value);
}

const ScatterChartUsageExampleWithClickEvent = () => {
  const data = useContext(DataContext);
  const [xAxis, setXAxis] = useState('amount');
  const [yAxis, setYAxis] = useState('current_company_valuation');
  const [size, setSize] = useState('total_rounds_number');
  const label = {
    amount: "Total Funding",
    current_company_valuation: "Ecosystem Value",
    total_rounds_number: "Funding Rounds",
    launch_year: "Funding Year",
    round_valuation_usd: "Round Evaluation",

  };
  const updateChartData = (jsonData) => {
    return jsonData.filter(item => 
      item[xAxis] != null && item[yAxis] != null && item[size] != null
    ).map((item, index) => {
      const xValue = getMedianValue(item[xAxis].toString());
      const yValue = getMedianValue(item[yAxis].toString());
      const sizeValue = getMedianValue(item[size].toString()); 
  
      return {
        ...item,
        [label[xAxis]]: xValue, 
        [label[yAxis]]: yValue,  
        [label[size]]: sizeValue || 1, 
        uniqueKey: `point-${index}`
      };
    });
  };
 
  const chartData = useMemo(() => data ? updateChartData(data) : [], [data, xAxis, yAxis, size]);

  
  const axisOptions = {
    "Ecosystem Value": "current_company_valuation",
    "Funding Rounds": "total_rounds_number",
    "Total Funding": "amount",
    "Funding Year" : "launch_year",
    "Round Evaluation": "round_valuation_usd",
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
        x={label[xAxis]}
        y={label[yAxis]}
        size={label[size]}
        autoMinXValue
        showOpacity={true}
        minYValue={0}
        showLegend={false}
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
                <Link to="/annual-report">Why Atlanta?</Link>
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
                      <Card key={item.name} className="mb-5 bg-slate-900">
                        <p className="text-tremor-default font-medium text-dark-tremor-content">
                          {item.name}
                        </p>
                        <div className="mt-2 flex items-baseline space-x-2.5">
                          <p className="text-tremor-metric font-semibold text-dark-tremor-content-strong">
                            {item.stat}
                          </p>
                          <span
                            className={classNames(
                              item.changeType === "positive"
                                ? "text-emerald-500"
                                : "text-red-500",
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
                        categories={["Start-ups"]}
                      />
                      <div className="text-center mt-2 text-cyan-200">Year</div>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold mb-2 text-cyan-200">
                        <p>Ecosystem Value by Cities (in billions)</p>
                      </h2>
                      <BarChart
                        data={ecosystemValueByCity}
                        index="city"
                        categories={["Ecosystem Value"]}
                      />
                      <div className="text-center mt-2 text-cyan-200">
                        Peer Cities
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
                            <span className="font-medium text-dark-tremor-content-strong">
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
                          colors={[
                            "blue",
                            "yellow",
                            "red",
                            "cyan",
                            "indigo",
                            "green",
                            "fuchsia",
                          ]}
                          className="mt-2 h-60"
                        />
                      </div>

                      <div>
                        <Legend
                          categories={[
                            "Healthcare",
                            "FinTech",
                            "Enterprise",
                            "Security",
                            "Transportation",
                            "Media",
                            "Other",
                          ]}
                          colors={[
                            "blue",
                            "yellow",
                            "red",
                            "cyan",
                            "indigo",
                            "green",
                            "fuchsia",
                          ]}
                          className="max-w-xs text-center"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="scatter-chart-container">
                    <ScatterChartUsageExampleWithClickEvent />
                  </div>
                  <div className="map-container" style={{ marginTop: "20px" }}>
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
            <p>
              If you have any questions, please don't hesitate to contact us at{" "}
              <a
                href="mailto: dashboardcoa@gmail.com"
                className="text-cyan-300 hover:underline"
              >
                dashboardcoa@gmail.com
              </a>
            </p>
          </div>
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;
