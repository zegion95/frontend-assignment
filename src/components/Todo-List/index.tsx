import React, { useState } from "react";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";

type Item = {
  type: "Fruit" | "Vegetable";
  name: string;
};

const initialItems: Item[] = [
  { type: "Fruit", name: "Apple" },
  { type: "Vegetable", name: "Broccoli" },
  { type: "Vegetable", name: "Mushroom" },
  { type: "Fruit", name: "Banana" },
  { type: "Vegetable", name: "Tomato" },
  { type: "Fruit", name: "Orange" },
  { type: "Fruit", name: "Mango" },
  { type: "Fruit", name: "Pineapple" },
  { type: "Vegetable", name: "Cucumber" },
  { type: "Fruit", name: "Watermelon" },
  { type: "Vegetable", name: "Carrot" },
];

const TodoList: React.FC = () => {
  const [mainList, setMainList] = useState<Item[]>(initialItems);
  const [fruitList, setFruitList] = useState<Item[]>([]);
  const [vegetableList, setVegetableList] = useState<Item[]>([]);

  const moveItem = (item: Item) => {
    setMainList((prev) => prev.filter((i) => i.name !== item.name));

    if (item.type === "Fruit") {
      setFruitList((prev) => [...prev, item]);
    } else {
      setVegetableList((prev) => [...prev, item]);
    }

    // Move back after 5 seconds
    setTimeout(() => {
      setFruitList((prev) => prev.filter((i) => i.name !== item.name));
      setVegetableList((prev) => prev.filter((i) => i.name !== item.name));
      setMainList((prev) => [...prev, item]);
    }, 5000);
  };

  const moveBackImmediately = (item: Item) => {
    if (item.type === "Fruit") {
      setFruitList((prev) => prev.filter((i) => i.name !== item.name));
    } else {
      setVegetableList((prev) => prev.filter((i) => i.name !== item.name));
    }
    setMainList((prev) => [...prev, item]);
  };

  return (
    <Box display="flex" gap={3} p={3}>
      {/* Main List */}
      <Card sx={{ width: "33%", p: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            Main List
          </Typography>
          {mainList.map((item) => (
            <Button
              key={item.name}
              variant="contained"
              color="primary"
              sx={{ width: "100%", mt: 1 }}
              onClick={() => moveItem(item)}
            >
              {item.name}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Fruits Column */}
      <Card sx={{ width: "33%", p: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            Fruits
          </Typography>
          {fruitList.map((item) => (
            <Button
              key={item.name}
              variant="contained"
              color="success"
              sx={{ width: "100%", mt: 1 }}
              onClick={() => moveBackImmediately(item)}
            >
              {item.name}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Vegetables Column */}
      <Card sx={{ width: "33%", p: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            Vegetables
          </Typography>
          {vegetableList.map((item) => (
            <Button
              key={item.name}
              variant="contained"
              color="error"
              sx={{ width: "100%", mt: 1 }}
              onClick={() => moveBackImmediately(item)}
            >
              {item.name}
            </Button>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TodoList;
