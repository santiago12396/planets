import { ChangeDetectionStrategy, Component, input, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Order } from '@/shared/models';

@Component({
  selector: 'app-order-by',
  imports: [FormsModule],
  templateUrl: './order-by.component.html',
  styleUrl: './order-by.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderByComponent {
  disabled = input.required<boolean>();

  sortByChange = output<string>();
  orderChange = output<Order>();

  sortByOptions = signal([{ key: 'englishName', label: 'Nombre' }]);

  orderOptions = signal([
    { key: Order.Asc, label: 'Ascendente' },
    { key: Order.Desc, label: 'Descendente' },
  ]);

  sortBy = model.required<string>();
  order = model.required<Order>();

  handleChangeSortBy() {
    this.sortByChange.emit(this.sortBy());
  }

  handleChangeOrder() {
    this.orderChange.emit(this.order());
  }
}
