/**
 * Controller for handling Profile-related operations.
 */
import { Request, Response } from 'express';
import ProfileModel, { IProfile } from '../models/profile';

class ProfileController {
    /**
     * Method to create a new profile.
     * @param req Request object containing profile data.
     * @param res Response object to send the result.
     */
    public async createProfile(req: Request, res: Response): Promise<void> {
        try {
            const profileData: Partial<IProfile> = req.body;
            const newProfile = await ProfileModel.createProfile(profileData);
            res.status(201).json(newProfile);
        } catch (error) {
            console.error('Error creating profile:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    /**
     * Method to retrieve all profiles.
     * @param req Request object.
     * @param res Response object to send the profiles.
     */
    public async getAllProfiles(req: Request, res: Response): Promise<void> {
        try {
            const profiles = await ProfileModel.getAllProfiles();
            res.status(200).json(profiles);
        } catch (error) {
            console.error('Error fetching profiles:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to retrieve a profile by its ID.
     * @param req Request object containing the profile ID.
     * @param res Response object to send the profile.
     */
    public async getProfileById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const profile = await ProfileModel.findProfileById(id);
            if (profile) {
                res.status(200).json(profile);
            } else {
                res.status(404).json({ error: 'Profile not found' });
            }
        } catch (error) {
            console.error('Error fetching profile by ID:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to update a profile by its ID.
     * @param req Request object containing the profile ID and updated data.
     * @param res Response object to send the updated profile.
     */
    public async updateProfile(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedProfileData = req.body;
            const updatedProfile = await ProfileModel.updateProfile(id, updatedProfileData);
            if (updatedProfile) {
                res.status(200).json(updatedProfile);
            } else {
                res.status(404).json({ error: 'Profile not found' });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to delete a profile by its ID.
     * @param req Request object containing the profile ID.
     * @param res Response object to send the result.
     */
    public async deleteProfile(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedProfile = await ProfileModel.deleteProfile(id);
            if (deletedProfile) {
                res.status(200).json({ message: 'Profile deleted successfully' });
            } else {
                res.status(404).json({ error: 'Profile not found' });
            }
        } catch (error) {
            console.error('Error deleting profile:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new ProfileController();
