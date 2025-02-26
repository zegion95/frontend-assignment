import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, CardContent, Typography } from "@mui/material";

const transformUsersData = async () => {
  try {
    const response = await axios.get("https://dummyjson.com/users");
    const users = response.data.users;

    const groupedData = users.reduce((acc: any, user: any) => {
      const { company, gender, age, hair, firstName, lastName, address } = user;
      const department = company.department;
      if (!acc[department]) {
        acc[department] = {
          male: 0,
          female: 0,
          ageRange: [Infinity, -Infinity],
          hair: {},
          addressUser: {},
        };
      }

      acc[department][gender.toLowerCase()]++;
      acc[department].ageRange = [
        Math.min(acc[department].ageRange[0], age),
        Math.max(acc[department].ageRange[1], age),
      ];

      acc[department].hair[hair.color] = (acc[department].hair[hair.color] || 0) + 1;
      acc[department].addressUser[`${firstName}${lastName}`] = address.postalCode;

      return acc;
    }, {});

    return groupedData;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

const DataGroup: React.FC = () => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    transformUsersData().then((data) => setData(data));
  }, []);

  console.log(data);

  return (
    <Box
      sx={{
        justifyContent: "left",
        alignItems: "left",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent>
        <Typography>{JSON.stringify(data, null, 2)}</Typography>
      </CardContent>
    </Box>
  );
};

export default DataGroup;
