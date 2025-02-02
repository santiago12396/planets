import { ChangeDetectionStrategy, Component, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  imports: [FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {
  searchTerm = model<string>('');
  searchTermChange = output<string>();

  handleChangeSearchTerm() {
    this.searchTermChange.emit(this.searchTerm());
  }
}
