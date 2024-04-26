// AboutUs.tsx
import React from "react";
import { Card } from "@tremor/react";

const AboutUs: React.FC = () => {
  const teamMembers = [
    { name: "Dickson Leong", role: "Team member", description: "Responsible for front end development and designing the dashboard", imageUrl: "/path/to/image1.jpg" },
    { name: "Alex Forbes", role: "Team member", description: "Handles the server-side logic and database management", imageUrl: "/path/to/image2.jpg" },
    { name: "Darren Ni", role: "Team member/Scrum Master", description: "Facilitates the Scrum process and ensures that the team is productive and self-organizing", imageUrl: "/path/to/image3.jpg" },
    { name: "Aaron Zaiman", role: "Team member", description: "Coordinates project with City of Atlanta/Georgia Tech counterparts and handles research on research metrics", imageUrl: "https://media.licdn.com/dms/image/D4E03AQHTIc8v6HQURQ/profile-displayphoto-shrink_200_200/0/1673890427223?e=2147483647&v=beta&t=09S5fWZL3egFTFkMqoKqMH0WLWUldw9nuR1Ig71aOTk" },
    { name: "Yasasvi Josyula", role: "Team member", description: "Responsible for figma mockups as a visualization tool and front end development", imageUrl: "/path/to/image5.jpg" },
    { name: "Doron Czarny", role: "Team member", description: "Responsible for front end development, specifically implementing specific requested features", imageUrl: "https://media.licdn.com/dms/image/C4E03AQHkxqXjihmFqw/profile-displayphoto-shrink_800_800/0/1661640605981?e=2147483647&v=beta&t=mbOumUJ-olz_q8ELhAC8eybbX5FxVD4XO7GRDdExRUI" },
    { name: "Lachlan Spangler", role: "Team member", description: "Handles feedback from City of Atlanta and product owners, and makes actionable items on jira to tackle ongoing issues", imageUrl: "/path.to/image7.jpg" },
  ];
  

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-cyan-200 mb-8">About Us Page</h1>

      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-slate-800 border-none p-6">
          <h2 className="text-xl font-bold mb-4 text-cyan-200">Meet the Team</h2>
          <ul className="divide-y divide-cyan-700">
            {teamMembers.map((member, index) => (
              <li key={index} className="py-4 flex items-center">
                <img src={member.imageUrl} alt={member.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-cyan-200">{member.name}</h3>
                  <p className="text-sm text-cyan-100 mb-1">{member.role}</p>
                  <p className="text-sm text-cyan-100">{member.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="bg-slate-800 border-none p-6">
          <h2 className="text-xl font-bold mb-4 text-cyan-200">Our Mission</h2>
          <p className="text-sm text-cyan-100">
          The mission of our project is to develop a comprehensive analysis and visualization of the startup ecosystem in Atlanta, aiming to provide vital insights for the City of Atlanta and potential investors. Through ecosystem mapping, defining key metrics, benchmarking against national and global standards, and identifying challenges and successes, we seek to offer a dynamic overview of Atlanta's economic metrics, highlight growth trends and investment opportunities, and ultimately contribute to fostering a thriving entrepreneurial environment in the city.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;
