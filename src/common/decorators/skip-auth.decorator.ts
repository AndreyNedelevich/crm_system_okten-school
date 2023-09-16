import { SetMetadata } from '@nestjs/common';

import { SKIP_AUTH } from "../constans";

export const SkipAuth = () => SetMetadata(SKIP_AUTH, true);