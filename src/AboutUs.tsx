import React from "react";
import { Card } from "@tremor/react";

const AboutUs: React.FC = () => {
  const teamMembers = [
    {
      name: "Aaron Zaiman",
      role: "Team member",
      description:
        "Coordinates project with City of Atlanta/Georgia Tech counterparts and handles research on research metrics",
      imageUrl:
        "https://media.licdn.com/dms/image/D4E03AQHTIc8v6HQURQ/profile-displayphoto-shrink_200_200/0/1673890427223?e=2147483647&v=beta&t=09S5fWZL3egFTFkMqoKqMH0WLWUldw9nuR1Ig71aOTk",
      linkedInUrl: "https://www.linkedin.com/in/aaron-zaiman-78756a253/",
    },
    {
      name: "Alex Forbes",
      role: "Team member",
      description: "Handles the server-side logic and database management",
      imageUrl:
        "https://media.licdn.com/dms/image/D4E03AQHQdQQ_oJW6Rw/profile-displayphoto-shrink_400_400/0/1670470394535?e=1719446400&v=beta&t=H74sijAtbvSmCFcMjiM-B0kqR2S098iojv9OugZ6Ix4",
      linkedInUrl: "https://www.linkedin.com/in/alexander-forbes-0bb876259/",
    },
    {
      name: "Darren Ni",
      role: "Team member/Scrum Master",
      description:
        "Facilitates the Scrum process and ensures that the team is productive and self-organizing",
      imageUrl:
        "https://media.licdn.com/dms/image/D4E03AQFZzEPJ_s4EjA/profile-displayphoto-shrink_400_400/0/1708819454865?e=1719446400&v=beta&t=DaT-pIa4F14A0bqZWkWLhlvZ23g7xMC4UrnPc2bHzak",
      linkedInUrl: "https://www.linkedin.com/in/darren-ni/",
    },
    {
      name: "Dickson Leong",
      role: "Team member",
      description:
        "Responsible for front end development and designing the dashboard",
      imageUrl:
        "https://media.licdn.com/dms/image/D5603AQGVDyJAZOV1Kw/profile-displayphoto-shrink_400_400/0/1685060790162?e=1719446400&v=beta&t=9XQhwnx3bsjJal8_Wj1hIaghBrEl5hpdggKhizo6xEk",
      linkedInUrl: "https://www.linkedin.com/in/chunkit-leong/",
    },
    {
      name: "Doron Czarny",
      role: "Team member",
      description:
        "Responsible for front end development, specifically implementing specific requested features",
      imageUrl:
        "https://media.licdn.com/dms/image/C4E03AQHkxqXjihmFqw/profile-displayphoto-shrink_800_800/0/1661640605981?e=2147483647&v=beta&t=mbOumUJ-olz_q8ELhAC8eybbX5FxVD4XO7GRDdExRUI",
      linkedInUrl: "https://www.linkedin.com/in/doron-czarny/",
    },
    {
      name: "Lachlan Spangler",
      role: "Team member",
      description:
        "Handles feedback from City of Atlanta and product owners, and makes actionable items on jira to tackle ongoing issues",
      imageUrl:
        "https://media.licdn.com/dms/image/C4E03AQFJJm5jWpO3cw/profile-displayphoto-shrink_800_800/0/1644958077596?e=1719446400&v=beta&t=LWqFFinszZqdGlxVxMXUh-sATtUcxbhNrSMtY11xC7U",
      linkedInUrl: "https://www.linkedin.com/in/lachlan-spangler/",
    },
    {
      name: "Yasasvi Josyula",
      role: "Team member",
      description:
        "Responsible for figma mockups as a visualization tool and front end development",
      imageUrl:
        "https://media.licdn.com/dms/image/D5603AQGaCXSmPtqHqA/profile-displayphoto-shrink_400_400/0/1697054713828?e=1719446400&v=beta&t=qUwKtVPyyRCucKJh3IkPWvcf5FpMdNyLiotefE3xSlQ",
      linkedInUrl: "https://www.linkedin.com/in/yasasvi-josyula/",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-cyan-300 mb-10">About Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <Card key={index} className="bg-slate-800 border-none p-8 rounded-lg">
            <div className="flex items-center space-x-4">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-24 h-24 rounded-full"
              />
              <div>
                <h3 className="text-xl font-semibold text-cyan-200">
                  <a
                    href={member.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {member.name}
                  </a>
                </h3>
                <p className="text-md text-cyan-200">{member.role}</p>
                <p className="text-md text-cyan-100 mt-1">
                  {member.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
        <Card className="bg-slate-800 border-none p-8 rounded-lg col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-2xl font-bold text-cyan-200 mb-4">Our Mission</h2>
          <p className="text-lg text-cyan-100">
            The mission of our project is to develop a comprehensive analysis
            and visualization of the startup ecosystem in Atlanta, aiming to
            provide vital insights for the City of Atlanta and potential
            investors. Through ecosystem mapping, defining key metrics,
            benchmarking against national and global standards, and identifying
            challenges and successes, we seek to offer a dynamic overview of
            Atlanta's economic metrics, highlight growth trends and investment
            opportunities, and ultimately contribute to fostering a thriving
            entrepreneurial environment in the city.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;
