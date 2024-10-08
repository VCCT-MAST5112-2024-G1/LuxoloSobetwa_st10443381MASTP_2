export type RootStackParamList = {
    Home: { meals: Meal [] };
    AddMenu: undefined;
};

/*
Naming the menu
*/
export type Meal = {
    Name: string;
    Description: string;
    course: string;
    Price: number;
};