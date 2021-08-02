import csv
import os
import subprocess
from Bio.PDB import *
from itertools import combinations
from flask import current_app

NOT_VALID = [
  '3j6x', '3j6y', '3j77', '3j78', '3j7p', '3j7r', '3jag', '3jah', '3jai', '3jaj', '3jan', '3jco', '3jcp', '3jct', '4ym7',
  '4u3m', '4u3n', '4u3u', '4u4n', '4u4o', '4u4q', '4u4r', '4u4u', '4u4y', '4u4z', '4u50', '4u51', '4u52', '4u53', '4u55',
  '4u56', '4u6f', '4v6i', '4v7h', '4v7r', '4v88', '4v8y', '4v8z', '4v92', '4ug0', '4ujc', '4ujd', '4uje', '4v5z', '4v6x',
  '4v62', '4v82', '4v60', '5dat', '5dc3', '5dge', '5dgf', '5dgv', '5fci', '5fcj', '5i4l', '5juo', '5jup', '5jus', '5jut',
  '5juu', '5lyb', '5m1j', '5mc6', '5mei', '5ndg', '5ndv', '5ndw', '5obm', '5on6', '5tbw', '5tga', '5tgm', '5aj0', '5lks',
  '5lzs', '5lzt', '5lzu', '5lzv', '5lzw', '5lzx', '5lzy', '5lzz', '5t2c', '5vyc', '5j4z', '5j7y', '5j8k', '5mpb', '5mpc', 
  '5wvi', '5wvk', '5wlc', '5wyj', '5wyk', '5gm6', '5it7', '5fl8', '5jcs', '5iv5', '5nrl', '5zwm', '5h4p', '6t42', '6t44', 
  '6zsq', '6zsr', '6gq1', '6gqb', '6gqv', '6hhq', '6i7o', '6q8y', '6s47', '6snt', '6sv4', '6t4q', '6t7i', '6t7t', '6t83', 
  '6tb3', '6tnu', '6woo', '6xiq', '6xir', '6z6j', '6z6k', '6orv', '6d90', '6d9j', '6ek0', '6fec', '6gz3', '6gz4', '6gz5',
  '6hcf', '6hcj', '6hcm', '6hcq', '6ip5', '6ip6', '6ip8', '6mtb', '6mtc', '6mtd', '6mte', '6ole', '6olf', '6olg', '6oli',
  '6olz', '6om0', '6om7', '6p5i', '6p5j', '6p5k', '6p5n', '6qzp', '6r5q', '6r6g', '6r6p', '6r7q', '6sgc', '6w2s', '6w2t',
  '6y0g', '6y2l', '6y57', '6yam', '6z6l', '6z6m', '6z6n', '6zm7', '6zme', '6zmi', '6zmo', '6zmw', '6zon', '6zp4', '6tka',
  '6dhe', '6dhf', '6dhg', '6dhh', '6dho', '6dhp', '6dwu', '6w1o', '6w1p', '6w1q', '6w1r', '6w1t', '6w1u', '6w1v', '6tg8',
  '6y25', '6y2m', '6y2t', '6y33', '6y34', '6y3q', '6bcu', '6bcx', '6fvt', '6fvu', '6fvv', '6fvw', '6fvx', '6fvy', '6j2c',
  '6j2n', '6j2q', '6j2x', '6j30', '6ke6', '6lqp', '6lqq', '6lqr', '6lqs', '6lqt', '6lqu', '6lqv', '6zqa', '6zqb', '6zqc',
  '6zqd', '6zqe', '6zqf', '6tsl', '6tsm', '6tsn', '6tso', '6tsp', '6tsq', '6tsr', '6yh0', '6fyx', '6fyy', '6gsm', '6gsn',
  '6uz7', '6ft6', '6m62', '6ylf', '6ylg', '6ylh', '6h03', '6sxs', '6elz', '6em1', '6enj', '6enu', '6r84', '6r86', '6r87',
  '6qdv'
]

NOT_SUP_FILES = [
  '2jp9_B-1', '2jp9_B-10', '2jp9_B-11', '2jp9_B-12', '2jp9_B-13', '2jp9_B-14', '2jp9_B-15', '2jp9_B-16', '2jp9_B-17', '2jp9_B-18', 
  '2jp9_B-19', '2jp9_B-2', '2jp9_B-20', '2jp9_B-3', '2jp9_B-4', '2jp9_B-5', '2jp9_B-6', '2jp9_B-7', '2jp9_B-8', '2jp9_B-9',
  '2jpa_B-1', '2jpa_B-10', '2jpa_B-11', '2jpa_B-12', '2jpa_B-13', '2jpa_B-14', '2jpa_B-15', '2jpa_B-16', '2jpa_B-17', '2jpa_B-18', 
  '2jpa_B-19', '2jpa_B-2', '2jpa_B-20', '2jpa_B-3', '2jpa_B-4', '2jpa_B-5', '2jpa_B-6', '2jpa_B-7', '2jpa_B-8', '2jpa_B-9'
]

def downloadPDB(pdb, dir):
  pdbl = PDBList()
  pdbl.retrieve_pdb_file(pdb, pdir = dir, file_format = 'pdb')

def getGeneralInformation(pdb, dir, repeatId):
  parser = PDBParser()
  entFile = dir + '/pdb' + pdb.lower() + '.ent'
  structure = parser.get_structure(pdb, entFile)
  try:
    name = structure.header['compound']['1']['molecule'].capitalize()
  except:
    name = 'Not Available'
  try:
    organism = structure.header['source']['1']['organism_scientific'].capitalize()
  except:
    try:
      organism = structure.header['source']['2']['organism_scientific'].capitalize()
    except:
      try:
        organism = structure.header['source']['3']['organism_scientific'].capitalize()
      except:
        try:
          organism = structure.header['source']['4']['organism_scientific'].capitalize()
        except:
          try:
            organism = structure.header['source']['5']['organism_scientific'].capitalize()
          except:
            try:
              organism = structure.header['source']['6']['organism_scientific'].capitalize()
            except:
              try:
                organism = structure.header['source']['7']['organism_scientific'].capitalize()
              except:
                organism = 'Not Available'
  r = {
    'id': repeatId[:4].lower() + repeatId[4:],
    'pdb_id': repeatId.split('_')[0].lower() + '_' + repeatId.split('_')[1],
    'lower': repeatId.split('_')[2],
    'upper': repeatId.split('_')[3],
    'name': name,
    'title': structure.header['name'].capitalize(),
    'organism': organism,
    'classification': structure.header['head'].capitalize()
  }
  return r

def estimateGenInfo(pdb, token, repeatId):
  os.makedirs('./files/' + token)
  os.makedirs('./files/' + token + '/entries')
  os.makedirs('./tsv-files/' + token)
  os.makedirs('./txt-files/' + token)
  downloadPDB(pdb, './files/' + token + '/entries')
  genInfo = getGeneralInformation(pdb, './files/' + token + '/entries', repeatId)
  return genInfo

def getPosCluster(filename, repeatId):
  pos = 0
  with open(filename, newline = '\n') as tsvfile:
    tsv_reader = csv.reader(tsvfile, delimiter = '\t')
    for row in tsv_reader:
      if (row[1] == repeatId):
        pos = int(row[0], 10)
  return pos

def getConformers(filename, pos):
  list = []
  with open(filename, newline = '\n') as tsvfile:
    tsv_reader = csv.reader(tsvfile, delimiter = '\t')
    for row in tsv_reader:
      if (row[0] != 'cluster'):
        if (int(row[0], 10) == pos):
          if (row[1].split('_')[0] not in NOT_VALID and row[1] not in NOT_SUP_FILES):
            list.append(row[1])
  return list

def parseStructure(conformers, repeatId, token):
  os.makedirs('./files/' + token + '/structures')
  io = PDBIO()
  parser = PDBParser(PERMISSIVE=1)
  for item in conformers:
    arr = item.split('_')
    pdb = arr[0]
    if (pdb != repeatId[:4]):
      downloadPDB(pdb, './files/' + token + '/entries')
    arr2 = arr[1].split('-')
    structure_id = pdb
    filename = './files/' + token + '/entries/pdb' + pdb + '.ent'
    structure = parser.get_structure(structure_id, filename)
    if (len(arr2) == 2):
      repeat_chain = arr2[0]
      repeat_model = int(arr2[1])
      model = structure[repeat_model - 1]
      for chain in model.get_list():
        if (repeat_chain == chain.get_id()):
          io.set_structure(chain)
          io.save('./files/' + token + '/structures/' + pdb + '_' + repeat_chain + '-' + str(repeat_model) + '.pdb')
          break
    elif (len(arr2) == 1):
      repeat_chain = arr[1]
      for chain in structure.get_chains():
        if (repeat_chain == chain.get_id()):
          io.set_structure(chain)
          io.save('./files/' + token + '/structures/' + pdb + '_' + repeat_chain + '.pdb')
          break

def generateRepeatRegion(repeatId, lower, upper, flag, token):
  if (flag):
    os.makedirs('./files/' + token + '/conformers')
  arr = repeatId.split('_')
  arr2 = arr[1].split('-')
  join = 'cat'
  file1 = ''
  file2 = ''
  if (int(lower) < 999):
    s = '''awk -F ' ' '{if ($5=="''' + arr2[0] + '''"){if ($6>=''' + lower + ''' && $6<=''' + upper + '''){print $0}} '''
    s = s + '''else if($4=="''' + arr2[0] + '''"){if ($5>=''' + lower + ''' && $5<=''' + upper + '''){print $0}}}' '''
    s = s + './structures/' + repeatId[:1] + '/' + repeatId + '.pdb > ./files/' + token + '/conformers/' + repeatId + '_' + lower + '_' + upper + '_first.pdb'    
    subprocess.call(s, shell=True)
    file1 ='./files/' + token + '/conformers/' + repeatId + '_' + lower + '_' + upper + '_first.pdb'
  if (int(lower) > 999 or int(upper) > 999):
    s = '''awk -F ' ' '{split($5,a,"''' + arr2[0] + '''"); if (a[2]>=''' + lower + ''' && a[2]<=''' + upper + '''){print $0}}' '''
    s = s + './structures/' + repeatId[:1] + '/' + repeatId + '.pdb > ./files/' + token + '/conformers/' + repeatId + '_' + lower + '_' + upper + '_second.pdb'    
    subprocess.call(s, shell=True)
    file2 = './files/' + token + '/conformers/' + repeatId + '_' + lower + '_' + upper + '_second.pdb'                   
  join = join + ' ' + file1 + ' ' + file2 + ' > ./files/' + token + '/conformers/' + repeatId + '_' + lower + '_' + upper + '.pdb'          
  subprocess.call(join, shell=True)
  subprocess.call('''sed -i '$a TER' ./files/''' + token + '/conformers/' + repeatId + '_' + lower + '_' + upper + '.pdb', shell=True)
  if (file1 != ''):
    subprocess.call(['rm', file1])
  if (file2 != ''):
    subprocess.call(['rm', file2])
  print(f"Repeat: {repeatId}")  

def cleanSupFiles(token):
  s = './files/' + token + '/sup-files'
  l = os.listdir(s)
  for item in l:
    _ext = item.split('.')
    if (not(len(_ext) == 2 and len(_ext[1]) == 3)):
      path = s + '/' + item
      subprocess.call(['rm', path])

def superposition(conformers, repeatId, token):
  os.makedirs('./files/' + token + '/sup-files')
  i = 1
  for item in conformers:
    if (item != repeatId.split('_')[0] + '_' + repeatId.split('_')[1]):
      #s = './TMalign ' + './files/' + token + '/conformers/' + repeatId + '.pdb ' + './files/' + token + '/structures/' + item + '.pdb -a T -o '
      s = './TMalign ' + './structures/' + item[:1] + '/' + item + '.pdb ' + './files/' + token + '/conformers/' + repeatId + '.pdb -a T -o '
      s = s + './files/' + token + '/sup-files/' + item + '.sup > ./txt-files/' + token + '/output-tmalign.txt'
      subprocess.call(s, shell = True)
      cleanSupFiles(token)
      print(f"{i}. {repeatId} - {item}")
      i = i + 1

def generateConformers(token):
  l = os.listdir('./files/' + token + '/sup-files')
  i = 1
  for item in l:
    f = open('./files/' + token + '/sup-files/' + item)
    flag = True
    for line in f:
      temp = line.split()
      if (temp[0] == 'ATOM'):
        if (flag):
          if (temp[4] == 'A'):
            if (temp[5] == '5T'):
              first = '5'
            else:
              first = temp[5]
          elif (temp[4][:1] == 'A'):
            first = temp[4][1:]
          flag = 0
        else:
          if (temp[4] == 'A'):
            last = temp[5]
          elif (temp[4][:1] == 'A'):
            last = temp[4][1:]
      elif (temp[0] == 'TER'):
        break    
    print(f'{i}. {item}')
    generateRepeatRegion(item.split('.')[0], first, last, False, token)
    i = i + 1
    
def conformationalDiversity(filename, token):
  l = os.listdir('./files/' + token + '/conformers')
  pairs = list(combinations(l, 2))
  i = 1
  with open(filename, 'w') as tsvfile:
    tsv_writer = csv.writer(tsvfile, delimiter = '\t')
    tsv_writer.writerow(['conformer1', 'conformer2', 'lower1', 'upper1', 'lower2', 'upper2', 'rmsd', 'seqId'])
    for item in pairs:
      conformer1, conformer2 = item
      s = './TMalign ' + './files/' + token + '/conformers/' + conformer1 + ' ./files/' + token + '/conformers/' + conformer2 + ' > ./txt-files/' + token + '/output-tmalign.txt'
      subprocess.call(s, shell = True)
      f = open('./txt-files/' + token + '/output-tmalign.txt')
      rmsd = ''
      for line in f:
        temp = line.rstrip().split(" ")
        if (temp[0] == 'Aligned'):
          rmsd = temp[6].split(',')[0]
          seqId = temp[8]
          break
      tsv_writer.writerow([conformer1.split('_')[0] + '_' + conformer1.split('_')[1],
      conformer2.split('_')[0] + '_' + conformer2.split('_')[1],
      conformer1.split('_')[2], conformer1.split('_')[3].split('.')[0],
      conformer2.split('_')[2], conformer2.split('_')[3].split('.')[0], rmsd, seqId])
      print(f"{i}. {conformer1.split('.')[0]} - {conformer2.split('.')[0]}")
      i = i + 1

def getConformersList(filename, repeatId):
  l = []
  with open(filename, newline = '\n') as tsvfile:
    tsv_reader = csv.reader(tsvfile, delimiter = '\t')
    for row in tsv_reader:
      if (row[0] == repeatId):
        obj = {
          'conformer_1': row[0],
          'conformer_2': row[1],
          'lower_1': row[2],
          'upper_1': row[3],
          'lower_2': row[4],
          'upper_2': row[5],
          'rmsd': row[6],
          'seq_id': row[7]
        }
        l.append(obj)
      elif (row[1] == repeatId):      
        obj = {
          'conformer_1': row[1],
          'conformer_2': row[0],
          'lower_1': row[4],
          'upper_1': row[5],
          'lower_2': row[2],
          'upper_2': row[3],
          'rmsd': row[6],
          'seq_id': row[7]
        }
        l.append(obj)
  return l

def estimateConformers(repeat, token):
  _repeatId = repeat.split('_')[0].lower() + '_' + repeat.split('_')[1]
  repeatId = repeat.split('_')[0].lower() + '_' + repeat.split('_')[1] + '_' + repeat.split('_')[2] + '_' + repeat.split('_')[3]
  pos = getPosCluster('./tsv-files/clusters.tsv', _repeatId)
  conformers = getConformers('./tsv-files/clusters.tsv', pos)
  #parseStructure(conformers, _repeatId[:4], token)
  generateRepeatRegion(_repeatId, repeat.split('_')[2], repeat.split('_')[3], True, token)
  superposition(conformers, repeatId, token)
  generateConformers(token)
  conformationalDiversity('./tsv-files/' + token + '/conformational-diversity.tsv', token)
  conformersList = getConformersList('./tsv-files/' + token + '/conformational-diversity.tsv', _repeatId)
  return conformersList

def getStructuralInformation(filename):
  i = 0
  rmsd_max = 0.0
  rmsd_min = 9999.0
  rmsd_total = 0.0
  temp = []
  with open(filename, newline = '\n') as tsvfile:
    tsv_reader = csv.reader(tsvfile, delimiter = '\t')
    for row in tsv_reader:
      if (row[0] != 'conformer1'):
        rmsd = float(row[6])
        rmsd_total = rmsd_total + rmsd
        if (rmsd > rmsd_max):
          rmsd_max = rmsd
        if (rmsd < rmsd_min):
          rmsd_min = rmsd
        if (row[0] not in temp):
          temp.append(row[0])
        if (row[1] not in temp):
          temp.append(row[1])
        i = i + 1
  rmsd_avg = rmsd_total / i
  r = {
    'num_conf': len(temp),
    'rmsd_max': rmsd_max,
    'rmsd_min': rmsd_min,
    'rmsd_avg': round(rmsd_avg, 2)
  }
  return r

def clean(l):
  for item in l:
    s = 'rm -r ' + item
    subprocess.call(s, shell=True)

def estimateStrucInfo(token):
  l = ['./files/' + token, './tsv-files/' + token, './txt-files/' + token]
  structuralInformation = getStructuralInformation('./tsv-files/' + token + '/conformational-diversity.tsv')
  clean(l)
  return structuralInformation

def launch_task(data, *args, **kwargs):
  current_app.task_queue.enqueue('app.tasks.analysis', data, *args, **kwargs)
  return