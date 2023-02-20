import os
from PyPDF2 import PdfFileReader, PdfFileWriter


def get_range(start_page, end_page):
    if start_page == end_page:
        return [start_page]
    else:
        my_list1 = list(range(start_page, end_page))
        my_list1.append(end_page)
        return my_list1


pdf = PdfFileReader('aarti-sangrah.pdf')

aarti_mapping = []
aarti_number_count = 1
current_start_page = 1
current_end_page = 1

while True:
    print("--------------------------")
    print(f"Aarti Number: \t {aarti_number_count}")
    print("--------------------------")
    print(f"Start Page: \t {current_start_page}")
    end = input(f"End page: \t [{current_end_page}] \t ")

    if end:
        current_end_page = int(end)

    aarti_mapping.append({
        'start': current_start_page,
        'end': current_end_page,
        'aarti_number_count': aarti_number_count
    })

    current_start_page = current_end_page + 1
    current_end_page = current_start_page
    aarti_number_count += 1

    stop = input(f"Stop?")
    if stop == 'yes':
        break

print(aarti_mapping)

for mapping in aarti_mapping:
    pdf_writer = PdfFileWriter()

    for page_no in get_range(mapping['start'], mapping['end']):
        pdf_writer.addPage(pdf.getPage(page_no-1))

    output_filename = f"aarti-sangrah-{mapping['aarti_number_count']}.pdf"

    with open(os.path.join("docs", output_filename), 'wb') as out:
        pdf_writer.write(out)

    print(f'Created: {output_filename}')
