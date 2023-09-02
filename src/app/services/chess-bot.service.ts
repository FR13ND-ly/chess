import { Injectable } from '@angular/core';
import OpenAI from 'openai-api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChessBotService {

  openai = new OpenAI(environment.openAi);

  constructor() {
  }
  
  async makeMove(game: any) {
    let gptResponse = await this.openai.complete({
      engine: 'davinci',
      prompt: `You are a professional chess player, you have next board ${game.board}, make a move as black`,
      maxTokens: 5,
      temperature: 0.9,
      topP: 1,
      presencePenalty: 0,
      frequencyPenalty: 0,
      bestOf: 1,
      n: 1,
      stream: false,
      stop: ['\n', "testing"]
    });
    console.log(gptResponse)
  }
}
