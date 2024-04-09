import blogCategory from '../models/blogCategories';

// Function to seed categories into the database
const seedCategories = async () => {
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
            await blogCategory.createBlogCategory(categoryData);
        }

        console.log('Categories seeded successfully!');
    } catch (error) {
        console.error('Error seeding categories:', error);
    }
};

// Seed categories
seedCategories();
