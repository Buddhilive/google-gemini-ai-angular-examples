import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gemini-nano-browser';

  ngOnInit() {
    this.testAI()
  }

  async testAI() {
    // Checks if  ai capabilities are supported by the browser
    const chromeAI = await (window as any).ai?.assistant.capabilities();

    if (chromeAI) {
      // Creates session with gemini nano model.
      const session = await (window as any).ai.assistant.create();

      // Execute a prompt
      let answer = await session.prompt("What is AI?");
      console.log(answer);

      // Destroys the session
      await session.destroy();
    } else {
      console.log('Chrome Built-In AI not supported.')
    }
  }
}
