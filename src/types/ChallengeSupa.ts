import { ChallengeStageSupa } from "./ChallengeStageSupa";

export interface ChallengeSupa {
id: number;
title: string;
description: string;
frequency: number;
catagory: string[];
suit_for: string[];
no_suit_for: string[];
rule: string[];
caution: string[];
img: string;
effect: string[];
stage_count: number;
price: number;
color: string;
challenge_stage?: ChallengeStageSupa[];
}
