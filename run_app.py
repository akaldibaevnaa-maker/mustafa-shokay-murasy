"""
«Мұстафа Шоқайдың балалық шағы, өскен ортасы» 
Цифрлық интерактивті білім беру платформасын іске қосу скрипті
"""

import webbrowser
import os
import sys

def main():
    cur_dir = os.path.dirname(os.path.abspath(__file__))
    index_path = os.path.join(cur_dir, "index.html")
    
    if os.path.exists(index_path):
        print("«Мұстафа Шоқайдың балалық шағы, өскен ортасы» платформасы іске қосылуда...")
        print(f"Файл жолы: {index_path}")
        webbrowser.open(f"file://{index_path}")
    else:
        print("Қате: index.html табылмады!")

if __name__ == "__main__":
    main()
