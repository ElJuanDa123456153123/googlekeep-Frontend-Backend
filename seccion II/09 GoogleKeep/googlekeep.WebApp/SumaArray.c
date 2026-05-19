#include <stdio.h>

int main() {
    // Definición del arreglo
    int arr[] = {1, 3, 6, 2, 7};
    int n_size = sizeof(arr) / sizeof(arr[0]);
    int objetivo = 9;

    printf("Resultados encontrados (indices):\n");

    // Bucle para buscar pares (arr[i] + arr[j])
    for (int i = 0; i < n_size; i++) {
        for (int j = i + 1; j < n_size; j++) {
            
            if (arr[i] + arr[j] == objetivo) {
                printf("[%d, %d]\n", i, j);
            }

            // Bucle para buscar tríos (arr[i] + arr[j] + arr[n])
            for (int n = j + 1; n < n_size; n++) {
                if (arr[i] + arr[j] + arr[n] == objetivo) {
                    printf("[%d, %d, %d]\n", i, j, n);
                }
            }
        }
    }

    return 0;
}