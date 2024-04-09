// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };

import { createBlogCategory } from '../models/blogCategories.js';

// Function to seed categories into the database
const seedCategories =  async () => {
    try {
        // Define the array of category data
        const categoriesData = [
            { name: 'Programming' },
            { name: 'Business' },
            { name: 'Critical thinking' },
            { name: 'Social Life' },
            { name: 'Technology' },
            { name: 'Science' }
        ];

        // Insert categories into the database
        //await blogCategory.create(categoriesData);
        
        // Create categories in the database
        for (const categoryData of categoriesData) {
            await createBlogCategory(categoryData);
        }
        
        console.log('Categories seeded successfully!');
    }
    catch (error) {
        console.error('Error seeding categories:', error);
    }
};
// Seed categories
seedCategories();
