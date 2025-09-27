import {Hono} from "hono";
import {useProfileDataFormatterService} from "../../domain/services/ProfileDataFormatterService";
import {useProfileService} from "../../domain/services/ProfileService";
import {CreateProfileRequest} from "../../domain/types";

const profile = new Hono();

profile.post('/', async (c) => {
    const formatProfileDataService = useProfileDataFormatterService()
    const profileService = useProfileService();

    const rawBodyContent = await c.req.json();
    const bodyContent = rawBodyContent as CreateProfileRequest;

    const formattedProfileData = formatProfileDataService.formatDataToProfileStructure(bodyContent);
    profileService.createInputProfileDataFile("df6702a5-80e9-4a4f-8695-83de1812ce08", formattedProfileData);

    return c.json(200);
});

export default profile;
